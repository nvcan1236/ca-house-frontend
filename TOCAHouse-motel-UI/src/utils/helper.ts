export const formatDate = (date:string) => new Date(date).toLocaleDateString("vi", {
  hour: 'numeric',
  minute: 'numeric',
  second: undefined,
})