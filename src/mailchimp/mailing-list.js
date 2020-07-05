import React from 'react'
import addToMailchimp from 'gatsby-plugin-mailchimp'
// import { Input } from 'bloomer/lib/elements/Form/Input'
import { FieldBody, Field, Label, Control, Input, Button, TextArea} from "bloomer"


export default class MailingList extends React.Component {
    state = {
        name: null,
        email: null,
    }

    _handleChange = e => {
        console.log({
            [`${e.target.name}`]: e.target.value,
        })
        this.setState({
            [`${e.target.name}`]: e.target.value,
        })
    }

    _handleSubmit = e => {
        e.preventDefault()

        console.log('submit', this.state)

        addToMailchimp(this.state.email, this.state)
            .then(({ msg, result }) => {
                console.log('msg', `${result}: ${msg}`)

                if (result !== 'success') {
                    this.refs.test.innerHTML = msg;
                }
                this.refs.test.innerHTML = msg;
            })
            .catch(err => {
                console.log('err', err)
                // alert(err)
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
                        {/* <input
                            type="text"
                            onChange={this._handleChange}
                            placeholder="name"
                            name="name"
                        /> */}
                        <FieldBody isGrouped>
                          <Field>
                            {/* <Label htmlFor="name">Name</Label> */}
                            <Control>
                              <Input
                                type="text"
                                onChange={this._handleChange}
                                placeholder="Your name"
                                name="name"
                              />
                            </Control>
                          </Field>
                          {/* <input
                              type="email"
                              onChange={this._handleChange}
                              placeholder="email"
                              name="email"
                          /> */}
                          <Field>
                            {/* <Label htmlFor="email">Email</Label> */}
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