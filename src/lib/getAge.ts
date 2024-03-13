export function getAge(): number {
  const today = new Date()
  const birthdate = new Date("2002/07/02")
  const age = today.getFullYear() - birthdate.getFullYear()
  const isBirthdayPassed =
    today.getMonth() > birthdate.getMonth() ||
    (today.getMonth() === birthdate.getMonth() && today.getDate() >= birthdate.getDate())
  return isBirthdayPassed ? age : age - 1
}
