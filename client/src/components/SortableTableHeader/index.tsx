import { ReactComponent as AscendingIcon } from "../../icons/ascending.svg";
import { ReactComponent as DescendingIcon } from "../../icons/descending.svg";
import { SortOrder } from "../../types";
import "./styles.scss";

interface Props {
  columnName: string;
  sortOrder: SortOrder;
  handleSort: (column: string) => void;
  label: string;
  hideOnSmall?: boolean;
  sortColumn?: string | null;
}

const SortableTableHeader = ({
  handleSort,
  columnName,
  label,
  sortOrder,
  sortColumn,
  hideOnSmall = false,
  ...props
}: Props) => {
  return (
    <th
      className={`sortable-header ${hideOnSmall ? "responsive-hide" : ""}`}
      {...props}
      onClick={() => handleSort(columnName)}
    >
      {label}
      {sortColumn === columnName && sortOrder === "asc" && <AscendingIcon />}
      {sortColumn === columnName && sortOrder === "desc" && <DescendingIcon />}
    </th>
  );
};

export default SortableTableHeader;
