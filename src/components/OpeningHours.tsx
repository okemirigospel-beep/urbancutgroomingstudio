import { openingHours } from "@/lib/appointments";
export default function OpeningHours() {
  return (
    <div className="opening-hours">
      {openingHours.map(({ days, hours }) => (
        <div key={days}>
          <span>{days}</span>
          <strong>{hours}</strong>
        </div>
      ))}
    </div>
  );
}
