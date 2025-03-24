import React from "react";
import { Link, useFetcher, Form } from "react-router-dom";
import {
  formatCurrency,
  formatDateToLocaleString,
  getAllMatchingItems,
} from "../helpers";
import { TrashIcon } from "@heroicons/react/16/solid";

const ExpenseItem = ({ expense }) => {
  const fetcher = useFetcher();

  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  });

  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDateToLocaleString(expense.createdAt)}</td>
      <td>
        <Link
          to={`/budget/${budget[0].id}`}
          style={{
            "--accent": budget[0].color,
            display: "inline-block",
          }}
        >
          {budget[0].name}
        </Link>
      </td>
      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />
          <button
            type="submit"
            className="btn btn--warning"
            aria-label={`Delete ${expense.name} expense`}
          >
            <TrashIcon width={15} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};

export default ExpenseItem;
