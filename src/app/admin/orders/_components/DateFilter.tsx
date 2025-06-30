// "use client";

// import { format } from "date-fns";
// import * as React from "react";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Button } from "@/components/ui/button";
// import { CalendarIcon } from "lucide-react";
// import { DateRange } from "react-day-picker";

// export function DateFilter() {
//   const [date, setDate] = React.useState<DateRange | undefined>({
//     from: undefined,
//     to: undefined,
//   });

//   const formatted =
//     date?.from && date?.to
//       ? `${format(date.from, "PPP")} - ${format(date.to, "PPP")}`
//       : "Pick a date range";

//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button
//           id="date"
//           variant={"outline"}
//           className="w-[300px] justify-start text-left font-normal"
//         >
//           <CalendarIcon className="mr-2 h-4 w-4" />
//           <span>{formatted}</span>
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-auto p-0" align="start">
//         <Calendar
//           initialFocus
//           mode="range"
//           selected={date}
//           onSelect={setDate}
//           numberOfMonths={2}
//         />
//       </PopoverContent>
//     </Popover>
//   );
// }
