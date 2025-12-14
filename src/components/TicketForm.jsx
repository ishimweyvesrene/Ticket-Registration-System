import { useState } from 'react'

const defaultFormState = {
  fullName: '',
  email: '',
  phone: '',
  idNumber: '',
  gender: '',
  ticketType: 'standard',
  quantity: '1',
  eventDate: '',
  eventLocation: ''
}

const ticketOptions = [
  { label: 'Standard', value: 'standard' },
  { label: 'VIP', value: 'vip' },
  { label: 'VVIP', value: 'vvip' }
]

const genderOptions = ['Female', 'Male', 'Prefer not to say']

const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000/api'

function TicketForm() {
  const [formData, setFormData] = useState(defaultFormState)
  const [status, setStatus] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const buildPayload = (data) => ({
    full_name: data.fullName,
    email: data.email,
    phone: data.phone,
    id_number: data.idNumber || '',
    gender: data.gender,
    ticket_type: data.ticketType,
    quantity: Number(data.quantity) || 1,
    event_date: data.eventDate,
    event_location: data.eventLocation || ''
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('Submitting your ticket...')

    try {
      const response = await fetch(`${API_BASE_URL}/tickets/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(buildPayload(formData))
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || 'Failed to submit ticket')
      }

      setStatus('Thanks! We have received your details.')
      setFormData(defaultFormState)
      setShowSuccess(true)
    } catch (error) {
      console.error('Ticket submission failed', error)
      setStatus('Sorry, we could not save your ticket. Please try again.')
      setShowSuccess(false)
    }
  }

  return (
    <section className="ticket-wrapper">
      <div className="ticket-arc" aria-hidden="true" />
      <div className="ticket-card">
        <p className="ticket-eyebrow">Secure your spot</p>
        <h1 className="ticket-title">Event Ticket Registration</h1>
        <p className="ticket-subtitle">
          Provide attendee information and ticket preferences so we can reserve your seat instantly.
        </p>

        <form className="ticket-form" onSubmit={handleSubmit}>
          <div className="ticket-section">
            <h2>1️⃣ Attendee Information</h2>
            <div className="ticket-grid">
              <label className="ticket-field">
                <span>Full Name</span>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g., Ama Mensah"
                  required
                />
              </label>

              <label className="ticket-field">
                <span>Email Address</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@email.com"
                  required
                />
              </label>

              <label className="ticket-field">
                <span>Phone Number</span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+233 555 123 456"
                  required
                />
              </label>

              <label className="ticket-field">
                <span>National ID / Passport</span>
                <input
                  type="text"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  placeholder="ID number"
                />
              </label>

              <label className="ticket-field">
                <span>Gender</span>
                <select name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="" disabled>
                    Select gender
                  </option>
                  {genderOptions.map((option) => (
                    <option key={option} value={option.toLowerCase()}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="ticket-section">
            <h2>2️⃣ Ticket Information</h2>
            <div className="ticket-grid">
              <label className="ticket-field">
                <span>Ticket Type</span>
                <select name="ticketType" value={formData.ticketType} onChange={handleChange} required>
                  {ticketOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="ticket-field">
                <span>Quantity</span>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  max="10"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="ticket-field">
                <span>Event Date</span>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  required
                />
              </label>

              <label className="ticket-field">
                <span>Event Location</span>
                <input
                  type="text"
                  name="eventLocation"
                  value={formData.eventLocation}
                  onChange={handleChange}
                  placeholder="Venue or city"
                />
              </label>
            </div>
          </div>

          <div className="ticket-footer">
            <p>We will email your confirmed tickets immediately after submission.</p>
            <button type="submit">Submit Ticket Request</button>
          </div>

          {status && <p className="ticket-status">{status}</p>}
        </form>
      </div>

      {showSuccess && (
        <div className="ticket-modal" role="dialog" aria-modal="true" aria-labelledby="ticket-modal-title" aria-describedby="ticket-modal-description">
          <div className="ticket-modal-card">
            <div className="ticket-modal-icon" aria-hidden="true">✓</div>
            <h3 id="ticket-modal-title">Booking Confirmed</h3>
            <p id="ticket-modal-description">Your ticket request is locked in. Check your inbox for confirmation details.</p>
            <button type="button" onClick={() => setShowSuccess(false)}>
              Okay, got it
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default TicketForm
