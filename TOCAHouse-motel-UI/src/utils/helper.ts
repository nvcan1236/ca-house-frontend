export const formatDate = (date:string) => new Date(date).toLocaleDateString("vi", {
  year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",

})