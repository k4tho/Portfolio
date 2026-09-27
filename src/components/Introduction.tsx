import { Mail } from 'lucide-react'

export function Introduction() {
  return (
    <section className="introduction" id="introduction" aria-labelledby="intro-title">
      <div className="intro-copy">
        <h1 id="intro-title">
          Katie <span>Ho</span>
        </h1>
        <p className="intro-role">
          Software Engineering <span aria-hidden="true">·</span> Data Science{' '}
        </p>
        <p className="intro-summary">
           <br></br>
        </p>

        <div className="intro-socials" aria-label="Contact links">
          <a href="mailto:katiehh04@gmail.com">
            <span className="intro-social-icon" aria-hidden="true">
              <Mail size={18} strokeWidth={1.9} />
            </span>
            <span>
              <strong>Email</strong>
              <small>katiehh04@gmail.com</small>
            </span>
          </a>
          <a
            href="https://linkedin.com/in/katho4/"
            target="_blank"
            rel="noreferrer"
          >
            <span className="intro-social-icon" aria-hidden="true">
              <b>in</b>
            </span>
            <span>
              <strong>LinkedIn</strong>
              <small>linkedin.com/in/katho4/</small>
            </span>
          </a>
          <a
            href="https://github.com/k4tho"
            target="_blank"
            rel="noreferrer"
          >
            <span className="intro-social-icon" aria-hidden="true">
              <b>GH</b>
            </span>
            <span>
              <strong>GitHub</strong>
              <small>github.com/k4tho</small>
            </span>
          </a>
        </div>
      </div>

      <div className="intro-photo" role="img" aria-label="Profile photo placeholder">
        <img
          src={`${import.meta.env.BASE_URL}IMG_3178.jpg`}
          alt="Katie Ho"
        />
      </div>
    </section>
  )
}
