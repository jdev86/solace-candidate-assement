// Helper to format phone numbers as (xxx) xxx-xxxx
export function formatPhoneNumber(phone: string) {
  const cleaned = ("" + phone).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
}

// Helper to format specialties as a bulleted list with capitalization
export function formatSpecialties(specialties: string[]) {
  if (!specialties.length) return null;
  return (
    <ul className="ml-4">
      {specialties.map((s, idx) => (
        <li
          key={idx}
          className="list-disc mb-1 capitalize text-base text-gray-800"
        >
          {s}
        </li>
      ))}
    </ul>
  );
}
