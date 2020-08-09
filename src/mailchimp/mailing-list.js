import React from 'react'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import { FieldBody, Field, Control, Input, Button } from "bloomer"


export default class MailingList extends React.Component {
    state = {
        name: null,
        email: null,
    }

    _handleChange = e => {
        this.setState({
            [`${e.target.name}`]: e.target.value,
        })
    }

    _handleSubmit = e => {
        e.preventDefault()

        addToMailchimp(this.state.email, this.state)
            .then(({ msg, result }) => {

                if (result !== 'success') {
                    this.refs.test.innerHTML = msg;
                }
                this.refs.test.innerHTML = msg;
            })
            .catch(err => {
                this.refs.test.innerHTML = err;
            })
    }

    render() {
        return (
            <div>
                <h1>Your null awaits!</h1>
                <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words.</p>
                <div>
                    <form onSubmit={this._handleSubmit}>
                        <FieldBody>
                          <Field>
                            <Control>
                              <Input
                                type="text"
                                onChange={this._handleChange}
                                placeholder="Your name"
                                name="name"
                              />
                            </Control>
                          </Field>
                          <Field>
                            <Control>
                              <Input
                                type="email"
                                onChange={this._handleChange}
                                placeholder="Your email"
                                name="email"
                              />
                            </Control>
                          </Field>
                          <Field>
                            <Control>
                              <Button isColor='secondary' type="submit">Submit</Button>
                            </Control>
                          </Field>
                        </FieldBody> 
                    </form>
                    <div id="output" ref='test'/>
                </div>
            </div>
        )
    }
}