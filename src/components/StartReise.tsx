type StartReiseProps = {
  onStart: () => void;
};

function StartReise({ onStart }: StartReiseProps) {
  return (
    <main className="reise-screen">
      <section className="start-card">
        <p className="eyebrow">Reiseplaner</p>
        <h1>Plane deine nächste Reise</h1>
        <p className="card-copy">
          Starte mit deinem Reiseformular und plane Urlaub, Daten und Reiseziel
          an einem Ort.
        </p>

        <button type="button" className="button-primary" onClick={onStart}>
          Zum Reiseformular
        </button>
      </section>
    </main>
  );
}

export default StartReise;
