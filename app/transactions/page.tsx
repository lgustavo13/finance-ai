import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";
import AddTransactionButton from "../_components/add-transaction-button";
import Navbar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ScrollArea } from "../_components/ui/scroll-area";
import canUserAddTransaction from "../_data/can-user-add-transaction";
import { isMatch } from "date-fns";
import TimeSelect from "../(home)/_components/time-select";

interface TransactionsProps {
  searchParams: {
    month: string;
  };
}

const TransactionsPage = async ({
  searchParams: { month },
}: TransactionsProps) => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  const monthsInvalid = !month || !isMatch(month, "MM");

  if (monthsInvalid) {
    redirect(`?month=${new Date().getMonth() + 1}`);
  }

  const transactions = await db.transaction.findMany({
    where: {
      userId,
      date: {
        gte: new Date(`2025-${month}-01`),
        lt: new Date(`2025-${month}-31`),
      },
    },
    orderBy: {
      date: "desc",
    },
  });

  const userCanAddTransaction = await canUserAddTransaction();

  return (
    <>
      <Navbar />
      <div className="flex h-full flex-col gap-6 overflow-hidden p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transações</h1>
          <div className="flex items-center gap-3">
            <TimeSelect />
            <AddTransactionButton
              userCarAddTransaction={userCanAddTransaction}
            />
          </div>
        </div>
        <ScrollArea>
          <DataTable
            columns={transactionColumns}
            data={JSON.parse(JSON.stringify(transactions))}
          />
        </ScrollArea>
      </div>
    </>
  );
};

export default TransactionsPage;
