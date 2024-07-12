import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { itemData } from "../../data/DataLoader";
import { throttle } from "lodash";
import Box from "@mui/material/Box";
import { MenuItem, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import { InventoryItem } from "../../data/data-classes/InventoryItem";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import { InventoryRow } from "./InventoryRow";

interface ItemData {
  id: number;
  name: string;
  rarity: string;
  usedFor: string;
  priceCp: number;
  quantity: number;
  source: string;
}

export const InventoryTable = ({
  inventory,
  forceUpdate,
  inventoryData,
}: {
  inventory: any;
  forceUpdate: any;
  inventoryData: any;
}) => {
  const container = useRef(null);

  // Virtualization variables
  const rowHeight = 50;

  const [scrollPosition, setScrollPosition] = React.useState(0);
  const [originalRows, setOriginalRows] = React.useState(
    setRows(inventoryData)
  );
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof ItemData>("priceCp");
  const [search, setSearch] = useState("");
  const [rarity, setRarity] = useState("all");
  const [usedFor, setUsedFor] = useState("all");
  const [totalHeight, setTotalHeight] = useState(0);
  const [bufferedItems, setBufferedItems] = useState(15);
  const [containerHeight, setHeight] = useState(440);
  const [bottomHeight, setBottomHeight] = useState(
    rowHeight * (originalRows.length - bufferedItems)
  );

  useEffect(() => {
    const height = container
      ? container.current
        ? container.current["offsetHeight"]
        : 0
      : 0;
    setHeight(height);
    setBufferedItems(Math.max(15, Math.ceil(height / rowHeight + 15)));
  });

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ItemData
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleFilterList = () => {
    const rows = originalRows.filter((row) => {
      if (
        row.name.toLowerCase().includes(search) &&
        (rarity == "all" || row.rarity.toLowerCase() == rarity.toLowerCase()) &&
        (usedFor == "all" ||
          row.usedFor.toLowerCase().includes(usedFor.toLowerCase()))
      ) {
        return row;
      }
    });
    return rows;
  };

  // get the children to be renderd
  const sortedRows = React.useMemo(() => {
    setOriginalRows(setRows(inventoryData));
    const filteredRows = handleFilterList();

    const startIndex = Math.max(
      Math.floor(scrollPosition / rowHeight) - bufferedItems,
      0
    );
    const endIndex = Math.min(
      Math.ceil((scrollPosition + containerHeight) / rowHeight - 1) +
        bufferedItems,
      filteredRows.length - 1
    );
    setTotalHeight(startIndex * rowHeight);

    const botHeight = rowHeight * (filteredRows.length - 1 - endIndex);
    setBottomHeight(botHeight);

    return stableSort(filteredRows, getComparator(order, orderBy)).slice(
      startIndex,
      endIndex + 1
    );
  }, [
    rowHeight,
    scrollPosition,
    order,
    orderBy,
    search,
    rarity,
    usedFor,
    forceUpdate,
  ]);

  const onScroll = React.useMemo(
    () =>
      throttle(
        function (e: any) {
          setScrollPosition(e.target.scrollTop);
        },
        50,
        { leading: true }
      ),
    []
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value.toLowerCase());
  };
  const handleRarity = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRarity(event.target.value);
  };

  const handleUsedFor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsedFor(event.target.value.toLowerCase());
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        id="outlined-search"
        label="Search"
        type="search"
        sx={{ width: "40%" }}
        onChange={handleSearch}
      />
      <TextField
        sx={{ width: "20%" }}
        id="raritySelect"
        select
        label="Rarity"
        defaultValue="all"
        helperText=""
        onChange={handleRarity}
      >
        {itemData.rarity.map((option) => (
          <MenuItem key={option.toLowerCase()} value={option.toLowerCase()}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        sx={{ width: "20%" }}
        id="usedForSelect"
        select
        label="Used For"
        defaultValue="all"
        helperText=""
        onChange={handleUsedFor}
      >
        {itemData.usedFor.map((option) => (
          <MenuItem key={option.toLowerCase()} value={option.toLowerCase()}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <Paper sx={{ width: "100%", mb: 2, overflow: "hidden" }}>
        <TableContainer
          sx={{ height: "50vh" }}
          ref={container}
          onScroll={onScroll}
          style={{
            overflowY: "scroll",
            position: "relative",
          }}
        >
          <Table
            stickyHeader
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="small"
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={sortedRows.length}
            />
            <TableBody>
              <TableRow sx={{ height: totalHeight }} />
              {sortedRows.map((row, index) => {
                const id = row.name.replace(" ", "-") + index;
                return (
                  <InventoryRow
                    key={id}
                    inventory={inventory}
                    row={row}
                    inventoryData={inventoryData}
                  />
                );
              })}
              <TableRow sx={{ height: bottomHeight }} />
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

function createData(item: InventoryItem): ItemData {
  const id = item.id;
  const quantity = item.quantity;
  const name = item.name;

  const recipeItem = itemData.itemList[id];

  const rarity = recipeItem.rarity;
  const usedFor = recipeItem.usedFor;
  const priceCp = recipeItem.priceCp;
  const source = recipeItem.source;

  return {
    id,
    name,
    rarity,
    usedFor,
    priceCp,
    quantity,
    source,
  };
}

function setRows(items: Map<string, InventoryItem>) {
  let itemList: ItemData[] = [];
  items.forEach((item) => {
    itemList.push(createData(item));
  });
  return itemList;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (orderBy != "rarity") {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  } else {
    const ar: string = a[orderBy] as string;
    const br: string = b[orderBy] as string;

    const ai = itemData.rarity.indexOf(ar);
    const bi = itemData.rarity.indexOf(br);
    return bi - ai;
  }
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof ItemData
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, rowCount, onRequestSort } = props;
  const createSortHandler =
    (property: keyof ItemData) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };
  return (
    <TableHead>
      <TableRow>
        <TableCell
          key="name"
          align="left"
          padding="normal"
          sortDirection={orderBy === "name" ? order : false}
        >
          <TableSortLabel
            active={orderBy === "name"}
            direction={orderBy === "name" ? order : "asc"}
            onClick={createSortHandler("name")}
          >
            Name
            {orderBy === "name" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell
          key="rarity"
          align="left"
          padding="normal"
          sortDirection={orderBy === "rarity" ? order : false}
        >
          <TableSortLabel
            active={orderBy === "rarity"}
            direction={orderBy === "rarity" ? order : "asc"}
            onClick={createSortHandler("rarity")}
          >
            Rarity
            {orderBy === "rarity" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell key="usedFor" align="right" padding="normal">
          Used For
        </TableCell>
        <TableCell
          key="priceCp"
          align="right"
          padding="normal"
          sortDirection={orderBy === "priceCp" ? order : false}
        >
          <TableSortLabel
            active={orderBy === "priceCp"}
            direction={orderBy === "priceCp" ? order : "asc"}
            onClick={createSortHandler("priceCp")}
          >
            Price
            {orderBy === "priceCp" ? (
              <Box component="span" sx={visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell key="quantity" align="right" padding="normal">
          Quantity
        </TableCell>
        <TableCell />
      </TableRow>
    </TableHead>
  );
}
