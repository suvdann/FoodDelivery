// {
//   accessorKey: "status",
//   header: "Delivery state",
//   cell: ({ row }) => {
//     const value = row.getValue("status");
//     const color =
//       value === "pending"
//         ? "bg-yellow-100 text-yellow-800"
//         : value === "delivered"
//         ? "bg-green-100 text-green-800"
//         : "bg-red-100 text-red-800";
//     return (
//       <div className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${color}`}>
//         {value}
//       </div>
//     );
//   },
// }
