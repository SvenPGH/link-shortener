export default function CombinedImprintPage() {
    return (
        <div className="w-full max-w-4xl mx-auto py-8 px-4 prose dark:prose-invert">
            {/* German Section */}
            <section>
                <h1>Impressum</h1>
                <p className="text-sm text-gray-500">Angaben gemäß § 5 TMG</p>

                <h2 className="text-xl font-bold mt-6">Anbieter:</h2>
                <p>
                    Sven Puite<br />
                    Bilker Allee 90<br />
                    40217 Düsseldorf<br />
                    Deutschland
                </p>

                <h2 className="text-xl font-bold mt-6">Kontakt:</h2>
                <p>
                    Telefon: +491607503513<br />
                    E-Mail: puitesven+svp@gmail.com
                </p>

                <h2 className="text-xl font-bold mt-6">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</h2>
                <p>
                    Sven Puite<br />
                    Bilker Allee 90
                </p>

                 <h2 className="text-xl font-bold mt-6">Online-Streitbeilegung</h2>
                <p>
                    Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit, die Sie hier finden: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a>.
                    <br />
                    Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
            </section>

            <hr className="my-12" />

            {/* English Section */}
            <section>
                <h1>Imprint</h1>
                <p className="text-sm text-gray-500">Information pursuant to § 5 TMG</p>

                <h2 className="text-xl font-bold mt-6">Provider:</h2>
                <p>
                    Sven Puite<br />
                    Bilker Allee 90<br />
                    40217 Düsseldorf<br />
                    Germany
                </p>

                <h2 className="text-xl font-bold mt-6">Contact:</h2>
                <p>
                    Phone: +491607503513<br />
                    Email: puitesven+svp@gmail.com
                </p>

                <h2 className="text-xl font-bold mt-6">Responsible for Content according to § 55 Abs. 2 RStV:</h2>
                <p>
                    Sven Puite<br />
                    Bilker Allee 90
                </p>

                <h2 className="text-xl font-bold mt-6">Online Dispute Resolution (ODR)</h2>
                <p>
                    The European Commission provides a platform for online dispute resolution (ODR), which you can access here: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a>.
                    <br />
                    We are not obligated and unwilling to participate in a dispute settlement procedure before a consumer arbitration board.
                </p>
            </section>
        </div>
    );
}