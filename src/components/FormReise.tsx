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
  const [newPackingItem, setNewPackingItem] = useState("");
  const [customPackingItems, setCustomPackingItems] = useState<string[]>([]);
  const [checkedPackingItems, setCheckedPackingItems] = useState<number[]>([]);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setSubmittedData(null);
    setNewPackingItem("");
    setCustomPackingItems([]);
    setCheckedPackingItems([]);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setSubmittedData(formData);
    setNewPackingItem("");
    setCustomPackingItems([]);
    setCheckedPackingItems([]);
  };

  const handlePackingItemSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedItem = newPackingItem.trim();

    if (!trimmedItem) {
      return;
    }

    setCustomPackingItems((current) => [...current, trimmedItem]);
    setNewPackingItem("");
  };

  const handlePackingItemToggle = (index: number) => {
    setCheckedPackingItems((current) =>
      current.includes(index)
        ? current.filter((itemIndex) => itemIndex !== index)
        : [...current, index],
    );
  };

  const packingList = submittedData?.ferienArt
    ? [
        ...packingListByFerienArt[submittedData.ferienArt],
        ...customPackingItems,
      ]
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
              <option value="" disabled hidden>
                Bitte auswählen
              </option>
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
            <ul className="packing-list">
              {packingList.map((item, index) => {
                const isChecked = checkedPackingItems.includes(index);

                return (
                  <li
                    key={`${item}-${index}`}
                    className={`packing-list-item${isChecked ? " is-checked" : ""}`}
                  >
                    <label className="packing-checkbox-label">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handlePackingItemToggle(index)}
                      />
                      <span>{item}</span>
                    </label>
                  </li>
                );
              })}
            </ul>

            <form className="packing-editor" onSubmit={handlePackingItemSubmit}>
              <label htmlFor="packingItem">Neues Packlisten-Item</label>
              <div className="packing-input-row">
                <input
                  id="packingItem"
                  name="packingItem"
                  type="text"
                  value={newPackingItem}
                  onChange={(event) => setNewPackingItem(event.target.value)}
                  placeholder="z. B. Reisepass"
                />
                <button
                  type="submit"
                  className="button-primary packing-add-button"
                  disabled={!newPackingItem.trim()}
                >
                  Hinzufügen
                </button>
              </div>
            </form>
          </section>
        )}
      </section>
    </main>
  );
}

export default FormReise;
