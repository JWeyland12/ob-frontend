import React from "react"
import { Icon } from "bloomer"

const SocialIcons = () => (
  [
    {
      // Icon color #ff0000
      "url":"https://www.google.com",
      "icon": "fab fa-youtube fa-lg youtube",
    },
    {
      // Icon color #3b5998
      "url":"https://www.google.com",
      "icon":"fab fa-facebook fa-lg facebook",
    },
    {
      // Icon color #b31217
      "url":"https://www.google.com",
      "icon":"fab fa-pinterest fa-lg pinterest",
    },
    {
      // Icon color #f10176
      "url":"https://www.google.com",
      "icon":"fab fa-instagram fa-lg instagram",
    },
    {
      // Icon color #55acee
      "url":"https://www.google.com",
      "icon":"fab fa-twitter fa-lg twitter",
    },
  ].map(function(d, idx){
    return (
      <a className="post-icons" href={d.url} key={idx}>
        <Icon className={d.icon}/>
      </a>
    )
  })
)

export default SocialIcons
