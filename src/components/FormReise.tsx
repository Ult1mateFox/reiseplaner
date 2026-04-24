import { useState, type ChangeEvent, type FormEvent } from "react";

type FormReiseProps = {
  onBack: () => void;
};

type FerienArt = "" | "Strand" | "Stadt" | "Abenteuer";

type ReiseFormData = {
  name: string;
  alter: string;
  ferienArt: FerienArt;
  reiseziel: string;
  startdatum: string;
  enddatum: string;
};

const initialFormData: ReiseFormData = {
  name: "",
  alter: "",
  ferienArt: "",
  reiseziel: "",
  startdatum: "",
  enddatum: "",
};

const packingListByFerienArt: Record<Exclude<FerienArt, "">, string[]> = {
  Strand: [
    "Sonnencreme",
    "Badehose",
    "Handtuch",
    "Sonnenbrille",
    "Flip-Flops",
    "Hut / Cap",
    "After-Sun-Lotion",
    "Strandtasche",
  ],

  Stadt: [
    "Bequeme Schuhe",
    "Kamera",
    "Powerbank",
    "Rucksack",
    "Stadtplan / Offline Maps",
    "Regenschirm",
    "Kleingeld / Karte",
    "Sonnenbrille",
  ],

  Abenteuer: [
    "Rucksack",
    "Wasserflasche",
    "Wanderschuhe",
    "Regenjacke",
    "Erste-Hilfe-Set",
    "Taschenlampe",
    "Snacks / Energieriegel",
    "Kompass / GPS",
  ],
};

function FormReise({ onBack }: FormReiseProps) {
  const [formData, setFormData] = useState<ReiseFormData>(initialFormData);
  const [submittedData, setSubmittedData] = useState<ReiseFormData | null>(
    null,
  );

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setSubmittedData(null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setSubmittedData(formData);
  };

  const packingList = submittedData?.ferienArt
    ? packingListByFerienArt[submittedData.ferienArt]
    : [];

  return (
    <main className="reise-screen">
      <section className="reise-card">
        <button type="button" className="button-secondary" onClick={onBack}>
          Zurück
        </button>

        <h1>Reiseformular</h1>

        <form className="reise-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              minLength={2}
            />
          </div>

          <div className="form-field">
            <label>Alter</label>
            <input
              name="alter"
              type="number"
              value={formData.alter}
              onChange={handleInputChange}
              required
              min={1}
            />
          </div>

          <div className="form-field">
            <label>Art der Ferien</label>
            <select
              name="ferienArt"
              value={formData.ferienArt}
              onChange={handleInputChange}
              required
            >
              <option value="">Bitte auswählen</option>
              <option value="Strand">Strand</option>
              <option value="Stadt">Stadt</option>
              <option value="Abenteuer">Abenteuer</option>
            </select>
          </div>

          <div className="form-field">
            <label>Reiseziel</label>
            <input
              name="reiseziel"
              value={formData.reiseziel}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label>Startdatum</label>
              <input
                name="startdatum"
                type="date"
                value={formData.startdatum}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-field">
              <label>Enddatum</label>
              <input
                name="enddatum"
                type="date"
                value={formData.enddatum}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="button-primary">
            Reise planen
          </button>
        </form>

        {submittedData && (
          <section className="result-card">
            <h2>Deine Reise</h2>

            <p>{submittedData.name}</p>
            <p>{submittedData.reiseziel}</p>

            <h3>Packliste</h3>
            <ul>
              {packingList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}
      </section>
    </main>
  );
}

export default FormReise;
