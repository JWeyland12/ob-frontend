import React from "react"
import { Footer, Container, Content, Icon, Columns, Column } from "bloomer"
import SocialIcons from "../components/icons"
import MailingList from "../mailchimp/mailing-list"

const MainFooter = () => {
  return (
    <Footer>
      <Container>
        <Columns>
          <Column>
          {/* Social icons */}
            <Content>
              <p>
                <p>{"Follow OrchidBoy.com"}</p>
                <SocialIcons/>
              </p>
            </Content>
            {/* Made with love by BrandName */}
            <Content>
              <p>
                Made with{" "}
                <Icon hasTextColor="danger" className="fa fa-heart"></Icon> by{" "}
                <a
                  href="https://google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Brandname
                </a>
              </p>
            </Content>
            {/* Built with Gatsby, Bulma, and Bloomer */}
            <Content isSize="small">
              <p>
                © {new Date().getFullYear()}, Built with
                {` `}
                <a
                  href="https://www.gatsbyjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Gatsby
                </a>
                ,{" "}
                <a
                  href="https://bulma.io"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bulma
                </a>{" "}
                and{" "}
                <a
                  href="https://bloomer.js.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Bloomer Components
                </a>{" "}
              </p>
            </Content>
          </Column>
          <Column>
            <MailingList/>
          </Column>
        </Columns>
      </Container>
    </Footer>
  )
}

export default MainFooter
