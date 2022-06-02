import React from 'react';

interface Props {
  columns: Array<string>;
  rows: Array<object>;
}

function ResultsTable({ columns, rows }: Props) {
  const thRow = () => {
    return (
      <tr>
        {columns.map((column) => {
          return <th key={column}>{column}</th>;
        })}
      </tr>
    );
  };

  const tdRows = () => {
    return rows.map((row) => {
      return (
        <tr>
          {columns.map((column, i) => {
            let value: string = row[column as keyof typeof row];
            if (typeof value === 'object') {
              value = JSON.stringify(value);
            }
            return <td key={i}>{value}</td>;
          })}
        </tr>
      );
    });
  };

  return (
    <table className="results-table">
      <thead>{thRow()}</thead>
      <tbody>{tdRows()}</tbody>
    </table>
  );
}

export default ResultsTable;
