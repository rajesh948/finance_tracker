import moment from "moment";
const fieldColors = [
  { name: "Jan 2023", color: "#E57373" },
  { name: "Feb 2023", color: "#F06292" },
  { name: "Mar 2023", color: "#AB47BC" },
  { name: "Apr 2023", color: "#7E57C2" },
  { name: "May 2023", color: "#303F9F" },
  { name: "Jun 2023", color: "#4FC3F7" },
  { name: "Jul 2023", color: "#00897B" },
  { name: "Aug 2023", color: "#81C784" },
  { name: "Sep 2023", color: "#7CB342" },
  { name: "Oct 2023", color: "#FFAB00" },
  { name: "Nov 2023", color: "#FFB300" },
  { name: "Dec 2023", color: "#546E7A" },
  { name: "Home Expense", color: "#00897B" },
  { name: "Personal Expense", color: "#AB47BC" },
  { name: "Income", color: "#7E57C2" },
  { name: "Personal Account", color: "#303F9F" },
  { name: "Real Living", color: "#4FC3F7" },
  { name: "My Dream Home", color: "#00897B" },
  { name: "Full Circle", color: "#7CB342" },
  { name: "Core Realtors", color: "#FFAB00" },
  { name: "Big Block", color: "#4E342E" },
];

export const getColor = (fieldName: string) => {
  return fieldColors.find((field) => field.name === fieldName)?.color;
};

export const getDateFormat = (date: Date) => {
  return moment(date).format("LL");
};

export const getRupeeFormat = (amount: number) => {
  const rupee = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });
  return rupee.format(amount);
};
