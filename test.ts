
type Arg<Func extends (...args: any) => any, Idx extends number = 0> = Parameters<Func>[Idx];
//type Arg<Func extends (arg: any) => any> = ArgNum<Func, 0>;

function getRevenuePerVisitor(element: Arg<typeof totalVisitors> & Arg<typeof totalRevenue>, ticketPrice: Arg<typeof totalRevenue, 1>): number {
  return totalRevenue(element, ticketPrice) / totalVisitors(element)
}

function totalVisitors(element: Arg<typeof getPaidVisitors> & Arg<typeof getFreeVisitors>): number {
  return element.paidVisitors + element.freeVisitors;
}

function totalRevenue(element: Arg<typeof getPaidVisitors>, ticketPrice: number): number {
  return getPaidVisitors(element) * ticketPrice
}

function getPaidVisitors(element: { paidVisitors: number }): number {
  return element.paidVisitors;
}

function getFreeVisitors(element: { freeVisitors: number }): number {
  return element.freeVisitors;
}