import { Check } from "lucide-react";
import { homeOffering } from "@/lib/catalogue";
export default function PackageInclusions() {
  return (
    <ul className="package-inclusions">
      {homeOffering.inclusions.map((item) => (
        <li key={item}>
          <Check aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
