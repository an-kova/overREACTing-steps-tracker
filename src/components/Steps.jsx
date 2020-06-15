import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid'
import DayModel from '../models/DayModel'

function Steps(props) {
  const emptyForm = { day: '', steps: 0 }
  const [days, setDays] = useState([])
  const [form, setForm] = useState(emptyForm)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prevForm) => ({ ...prevForm, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setDays((prevDays) =>
      // const newDay = (id) => {
      //   return new DayModel(id, form.day, form.steps)
      // }

      // const newDayUpd = (prevDays) => {
      //   prevDays.map((o) => {
      //     console.log(o)
      //     o.day === form.day ? newDay(o.id) : newDay(nanoid())
      //   })
      // }
      // console.log(newDayUpd)

      // newDayUpd(prevDays).sort((a, b) => {
      //   return a.day < b.day ? 1 : -1
      // })
      [...prevDays, form].sort((a, b) => {
        return a.day < b.day ? 1 : -1
      })
    )

    console.log(days)
    setForm(emptyForm)
  }

  const handleEdit = (o) => {
    // setDays(prevDays => prevDays)
    console.log('Handle me!')
  }

  const handleRemove = (id) => {
    setDays((prevDays) => prevDays.filter((o) => o.id !== id))
  }

  return (
    <div className="container">
      <h1>Steps Tracker</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-item">
          {/* Localized constraints are provided by type="data"
          <label htmlFor="day">Date (MM.DD.YY)</label> */}
          <label htmlFor="day">Date</label>
          <input
            type="date"
            name="day"
            value={form.day}
            id="day"
            className="form-input"
            // fallback support for type=text
            // pattern="\d{4}-\d{2}-\d{2}"
            min="1900-01-01"
            required
            onChange={handleChange}
          />
          {/* <span className="form-input-validity"></span> */}
        </div>
        <div className="form-item">
          <label htmlFor="steps">Steps made</label>
          <input
            type="number"
            name="steps"
            value={form.steps}
            id="steps"
            className="form-input"
            min="0"
            required
            onChange={handleChange}
          />
          {/* <span className="form-input-validity"></span> */}
        </div>
        <button type="submit" className="form-item form-cta form-input">
          ADD
        </button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th className="table-headers">Date</th>
            <th scope="col" className="table-headers">
              Steps made
            </th>
            <th scope="col" className="table-headers">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="table-body">
          {/* Dynamic: */}
          {days.map((o) => (
            <tr>
              <th scope="row">{o.day}</th>
              <td>{o.steps}</td>
              <td>
                <button
                  className="table-btn table-edit"
                  onClick={() => handleEdit(o)}>
                  <i className="material-icons" role="presentation">
                    edit
                  </i>
                  <span className="sr-only">Edit</span>
                </button>
                <button
                  className="table-btn table-remove"
                  onClick={() => handleRemove(o.id)}>
                  <i className="material-icons" role="presentation">
                    clear
                  </i>
                  <span className="sr-only">Remove</span>
                </button>
              </td>
            </tr>
          ))}

          {/* Static: */}
          <tr>
            <th scope="row">06.14.2020</th>
            <td>2,035</td>
            <td>
              <button className="table-btn table-edit">
                <i className="material-icons" role="presentation">
                  edit
                </i>
                <span className="sr-only">Edit</span>
              </button>
              <button className="table-btn table-remove">
                <i className="material-icons" role="presentation">
                  clear
                </i>
                <span className="sr-only">Remove</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

Steps.propTypes = {}

export default Steps