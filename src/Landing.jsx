import './landing.css'

const audiences = [
  {
    id: 'students',
    numeral: 'I.',
    who: 'Students',
    title: 'Know what to learn next, and why.',
    copy: "Pick the role you want. SkillBridge compares it with the skills you've actually proven, then points at the two or three gaps worth your evenings.",
    points: ['Your skills mapped against a real role', 'A roadmap ordered by what employers ask for', 'Internships ranked by how well you fit'],
    link: ['overview', 'Open the student workspace'],
  },
  {
    id: 'colleges',
    numeral: 'II.',
    who: 'Colleges',
    title: 'See the gap before placement season does.',
    copy: 'Skill data across a whole batch shows where students fall short of what companies are hiring for this year, not what the syllabus assumed five years ago.',
    points: ['Industry demand vs. student proficiency', 'Placement trends, month by month', 'Hiring feedback tied to specific skills'],
    link: ['college', 'Open the college view'],
  },
  {
    id: 'companies',
    numeral: 'III.',
    who: 'Companies',
    title: 'Shortlist on evidence, not keywords.',
    copy: "Every candidate's match is broken down skill by skill, so you can see why someone ranks where they do before you spend an hour interviewing them.",
    points: ['Verified skills instead of résumé keywords', 'A match breakdown for every open role', 'Send feedback straight back to colleges'],
    link: ['industry', 'Open the industry view'],
  },
]

const steps = [
  ['Pick a target role', 'Frontend Developer, Data Analyst, whatever you are aiming for. The requirements come from roles companies have posted on the platform.'],
  ['Prove what you know', 'Short, practical checks of about ten minutes each. Pass one and that skill is marked verified on your profile.'],
  ['Close the gaps that count', 'Your roadmap lists only what is missing, in the order employers seem to care about it.'],
  ['Apply where you fit', 'Roles are sorted by match. The company sees the same breakdown you do, so nobody is guessing.'],
]

const gapTable = [['Cloud computing', 76, 41], ['TypeScript', 64, 36], ['Testing', 59, 32], ['Data structures', 71, 58]]

const statusMark = { verified: '✓', developing: '~', gap: '✗' }

function Landing({ go, student, themeToggle }) {
  const verifiedCount = student.skills.filter(([, , status]) => status === 'verified').length

  return (
    <div className="lp">
      <header className="lp-masthead">
        <div className="lp-bar">
          <button className="lp-wordmark" onClick={() => go('landing')}>SkillBridge</button>
          <nav className="lp-nav">
            <a href="#students">Students</a>
            <a href="#colleges">Colleges</a>
            <a href="#companies">Companies</a>
            <a href="#how">How it works</a>
          </nav>
          <div className="lp-bar-actions">
            {themeToggle}
            <button className="lp-button" onClick={() => go('overview')}>Open the demo</button>
          </div>
        </div>
      </header>

      <main>
        <section className="lp-hero">
          <div className="lp-hero-copy">
            <h1>A transcript lists the courses. It doesn&apos;t say who can ship a React app.</h1>
            <p className="lp-lede">
              SkillBridge sits between colleges, students and the companies that hire them. Students see exactly what they&apos;re missing for the job they want.
              Colleges see where the syllabus has fallen behind. Companies see verified skills instead of keyword-stuffed résumés.
            </p>
            <div className="lp-hero-actions">
              <button className="lp-button" onClick={() => go('overview')}>Try it as a student →</button>
              <button className="lp-link" onClick={() => go('college')}>or look at the college view</button>
            </div>
            <p className="lp-note">Every name and number in this prototype is sample data.</p>
          </div>

          <figure className="lp-figure">
            <div className="lp-sheet">
              <div className="lp-sheet-head">
                <span>{student.name}</span>
                <span>Target: {student.role}</span>
              </div>
              <table>
                <tbody>
                  {student.skills.map(([name, level, status]) => (
                    <tr key={name} className={`is-${status}`}>
                      <td>{name}</td>
                      <td>{level}</td>
                      <td className="lp-mark">{statusMark[status]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="lp-sheet-foot">
                <span>{verifiedCount} of {student.skills.length} verified</span>
                <strong>{student.readiness}% ready</strong>
              </div>
            </div>
            <figcaption>
              <b>Fig. 1</b> Meera&apos;s skills measured against a Frontend Developer role. TypeScript is the gap that matters most, so it&apos;s first on the roadmap.
            </figcaption>
          </figure>
        </section>

        <section className="lp-audiences">
          {audiences.map((item) => (
            <article id={item.id} key={item.id} className="lp-audience">
              <div className="lp-kicker"><span>{item.numeral}</span> For {item.who.toLowerCase()}</div>
              <h2>{item.title}</h2>
              <p>{item.copy}</p>
              <ul>
                {item.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
              <button className="lp-link" onClick={() => go(item.link[0])}>{item.link[1]} →</button>
            </article>
          ))}
        </section>

        <section className="lp-how" id="how">
          <div className="lp-how-head">
            <div className="lp-kicker">How it works</div>
            <h2>From &ldquo;I think I&apos;m ready&rdquo; to an offer, in four steps.</h2>
          </div>
          <ol>
            {steps.map(([title, copy], index) => (
              <li key={title}>
                <span className="lp-step-num">{index + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="lp-evidence">
          <blockquote className="lp-quote">
            <p>&ldquo;We need graduates who can move from a local project to a production environment with confidence.&rdquo;</p>
            <footer>Ananya Menon, Engineering Lead at PixelCraft <span>(sample quote)</span></footer>
          </blockquote>

          <div className="lp-table">
            <div className="lp-kicker">Eastridge College, this term</div>
            <h3>Where students trail industry demand</h3>
            <table>
              <thead>
                <tr><th>Skill</th><th>Demand</th><th>Students</th><th>Gap</th></tr>
              </thead>
              <tbody>
                {gapTable.map(([skill, demand, have]) => (
                  <tr key={skill}>
                    <td>{skill}</td>
                    <td>{demand}%</td>
                    <td>{have}%</td>
                    <td><b>{demand - have}</b> pts</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="lp-note">Demand is the share of posted roles asking for the skill. Sample data.</p>
          </div>
        </section>

        <section className="lp-closing">
          <h2>The demo takes about five minutes to click through.</h2>
          <button className="lp-button" onClick={() => go('overview')}>Start with Meera&apos;s dashboard →</button>
        </section>
      </main>

      <footer className="lp-footer">
        <span className="lp-wordmark">SkillBridge</span>
        <span>Hackathon prototype, 2026. Sample data throughout.</span>
        <nav>
          <button className="lp-link" onClick={() => go('overview')}>Students</button>
          <button className="lp-link" onClick={() => go('college')}>Colleges</button>
          <button className="lp-link" onClick={() => go('industry')}>Companies</button>
        </nav>
      </footer>
    </div>
  )
}

export default Landing
