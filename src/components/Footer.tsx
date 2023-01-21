/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { AiOutlineTwitter, AiOutlineGithub } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="footer place-items-center bg-neutral p-10 text-neutral-content md:place-items-stretch">
      <div className="place-items-center md:place-items-start">
        <p className="font-bold">
          Made with ❤ by{" "}
          <a
            href="https://www.bastibuck.de"
            className="link-accent link"
            target="_blank"
            rel="noreferrer"
          >
            Basti Buck
          </a>
        </p>

        <div className="grid grid-flow-col gap-4 ">
          <a
            className="text-neutral-content hover:text-accent"
            target="_blank"
            rel="noreferrer"
            href="https://twitter.com/bastibuck"
          >
            <AiOutlineTwitter className="text-3xl" />
          </a>
          <a
            className="text-neutral-content hover:text-accent"
            target="_blank"
            rel="noreferrer"
            href="https://github.com/bastibuck"
          >
            <AiOutlineGithub className="text-3xl" />
          </a>
        </div>
      </div>

      <div className="place-items-center md:place-items-end">
        <p className="font-thin">
          Copyright © {new Date().getFullYear()} - All right reserved
        </p>

        <div className="grid grid-flow-col gap-4">
          <label
            htmlFor="privacy-modal"
            className="link-hover link-accent link font-medium"
          >
            Privacy
          </label>

          <label
            htmlFor="imprint-modal"
            className="link-hover link-accent link font-medium"
          >
            Imprint
          </label>
        </div>

        <input type="checkbox" id="privacy-modal" className="modal-toggle" />
        <label htmlFor="privacy-modal" className="modal cursor-pointer">
          <label className="modal-box text-neutral" htmlFor="">
            <h3 className="text-lg font-bold">Privacy</h3>
            <p className="space-y-4">
              We don't collect or store any personal info in order for you to
              use <strong>VoteUp</strong> safely and anonymously.
            </p>
            <p className="space-y-4">
              No cookies are needed to use our service. Therefor we don't set
              any.
            </p>
            <p className="space-y-4">
              We furthermore don't use provide any personal information to third
              parties - as we don't use any.
            </p>
            <div className="modal-action">
              <label htmlFor="privacy-modal" className="btn-primary btn">
                Close
              </label>
            </div>
          </label>
        </label>

        <input type="checkbox" id="imprint-modal" className="modal-toggle" />
        <label htmlFor="imprint-modal" className="modal cursor-pointer">
          <label className="modal-box relative pb-0 text-neutral" htmlFor="">
            <h3 className="font-bold">Imprint</h3>

            <p>Daten gemäß Abschnitt 5 TMG</p>
            <p>Sebastian Buck</p>
            <p>
              Feldstraße 41 <br />
              24105 Kiel - Germany
            </p>

            <h4>Contact</h4>
            <p>
              0176 30 15 00 88 <br />
              mail@bastibuck.de <br />
              www.bastibuck.de
            </p>

            <h3>Haftungsausschluss</h3>
            <h4>Verantwortlichkeit für Inhalte</h4>
            <p>
              Die Inhalte unserer Webseiten wurden unter größter Sorgfalt
              erstellt. Trotzdem können wir nicht garantieren, dass der Inhalt
              aktuell, zuverlässig oder komplett ist. Gemäß den gesetzlichen
              Vorschriften sind wir für die selbst erstellten Inhalte
              verantwortlich. In diesem Zusammenhang möchten wir klarstellen,
              dass wir nicht verantwortlich sind für Informationen, die von
              dritten Parteien zur Verfügung gestellt oder von diesen gesammelt
              werden. Werden illegale Aktivitäten festgestellt, folgen wir
              unserer Verpflichtung die entsprechenden Inhalte zu blockieren
              oder zu löschen, entsprechend den Paragraphen 8 bis 10 des
              Telemedia Acts (TMG).
            </p>
            <h4>Verantwortlichkeit für Links</h4>
            <p>
              Die Verantwortung für Inhalte von Links Dritter (externe Inhalte)
              liegt in der Verantwortung der jeweiligen Webseitenbetreiber. Zum
              Zeitpunkt der Einfügung der verwendeten Links auf unseren Seiten
              wurden keine illegalen Aktivitäten in diesen festgestellt. Sobald
              uns illegale Aktivitäten oder Verstöße bekannt werden, werden wir
              den entsprechenden Link entfernen.
            </p>
            <h4>Copyright</h4>
            <p>
              Unsere Webseiten und deren Inhalt (Texte, Fotos, Grafiken, Design)
              unterliegen dem deutschen Urheberrecht. Soweit nicht anderweitig
              gesetzlich vereinbart unterliegt der Nutzen, die Widergabe, Kopie
              oder die Veränderung der Inhalte dem Urheberrecht. Ausnahmen
              müssen schriftlich von den Webseitenbetreibern oder Rechteinhabern
              genehmigt werden. Individuelle Kopien sind nur für den privaten
              Gebrauch gestattet, sie dürfen weder direkt noch indirekt für
              wirtschaftliche Zwecke genutzt werden. Der nicht genehmigte Nutzen
              von unter Urheberrecht geschütztem Material ist nach Paragraph 106
              strafbar.
            </p>

            <div className="modal-action sticky bottom-0 bg-inherit py-6">
              <label htmlFor="imprint-modal" className="btn-primary btn">
                Close
              </label>
            </div>
          </label>
        </label>
      </div>
    </footer>
  );
};

export default Footer;
