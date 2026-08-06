import Link from "next/link";
import DeleteButton from "@/components/admin/DeleteButton";

interface Column<T> {
  header: string;
  render: (row: T) => React.ReactNode;
}

interface DataTableProps<T extends { id: string }> {
  columns: Column<T>[];
  rows: T[];
  editHref: (row: T) => string;
  deleteAction: (id: string) => Promise<void>;
  itemLabel?: (row: T) => string;
  emptyLabel?: string;
}

export default function DataTable<T extends { id: string }>({
  columns,
  rows,
  editHref,
  deleteAction,
  itemLabel,
  emptyLabel = "Nothing here yet.",
}: DataTableProps<T>) {
  if (rows.length === 0) {
    return (
      <p className="border border-stone p-10 text-center text-sm text-ink-muted">
        {emptyLabel}
      </p>
    );
  }

  return (
    <div className="overflow-x-auto border border-stone">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-stone">
            {columns.map((col) => (
              <th key={col.header} className="label px-4 py-3 text-ink-muted">
                {col.header}
              </th>
            ))}
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-stone last:border-b-0">
              {columns.map((col) => (
                <td key={col.header} className="px-4 py-3 align-top text-ink">
                  {col.render(row)}
                </td>
              ))}
              <td className="px-4 py-3 align-top">
                <div className="flex items-center justify-end gap-4">
                  <Link
                    href={editHref(row)}
                    className="label text-ink-muted transition-colors duration-300 hover:text-gold-dim"
                  >
                    Edit
                  </Link>
                  <DeleteButton
                    action={deleteAction.bind(null, row.id)}
                    itemLabel={itemLabel?.(row)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
