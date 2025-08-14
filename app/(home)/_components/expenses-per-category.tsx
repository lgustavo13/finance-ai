import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { Progress } from "@/app/_components/ui/progress";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { TRANSACTION_CATEGORY_LABELS } from "@/app/_constants/transactions";
import { TotalExpensePerCategory } from "@/app/_data/get-dashboard/type";

interface ExpensesPerCategoryProps {
  expensesPerCategory: TotalExpensePerCategory[];
}

const ExpensesPerCategory = ({
  expensesPerCategory,
}: ExpensesPerCategoryProps) => {
  return (
    <ScrollArea className="col-span-2 h-full rounded-md border pb-6">
      <CardHeader>
        <CardTitle className="font-bold">Gastos por Categoria</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {expensesPerCategory.length > 0 ? (
          expensesPerCategory.map((catergory) => (
            <div key={catergory.category} className="space-y-2">
              <div className="flex w-full justify-between">
                <p className="text-sm font-bold">
                  {TRANSACTION_CATEGORY_LABELS[catergory.category]}
                </p>
                <p className="text-sm font-bold">
                  {catergory.percentageOfTotal}%
                </p>
              </div>
              <Progress value={catergory.percentageOfTotal} />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-muted-foreground">Nenhum gasto cadastrado.</p>
          </div>
        )}
      </CardContent>
    </ScrollArea>
  );
};

export default ExpensesPerCategory;
