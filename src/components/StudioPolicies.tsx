import { studioPolicies, studioRequestNotice } from "@/lib/studio-policies";
export default function StudioPolicies() {
  return (
    <section className="studio-policies" aria-label="Studio booking policies">
      <h3>Studio booking policies</h3>
      {studioPolicies.map((policy) => (
        <div key={policy.title}>
          <h4>{policy.title}</h4>
          <p>{policy.text}</p>
        </div>
      ))}
      <p className="studio-request-notice">{studioRequestNotice}</p>
    </section>
  );
}
