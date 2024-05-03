import Link from "next/link";

interface PaginationProps {
  total: number;
  page: string;
}

const PAGI_LENGTH = 9;

export default function Pagination({ total, page }: PaginationProps) {
  const startNumber =
    parseInt(page) + Math.floor(PAGI_LENGTH / 2) < PAGI_LENGTH + 1
      ? 1
      : parseInt(page) - Math.floor(PAGI_LENGTH / 2);
  const endNumber =
    total - parseInt(page) > Math.floor(PAGI_LENGTH / 2)
      ? startNumber + PAGI_LENGTH - 1
      : total;

  const getPagiList = () => {
    let start = startNumber;
    if (endNumber - startNumber < PAGI_LENGTH) {
      start = endNumber - PAGI_LENGTH + 1;
    }
    const pagi = new Array();
    for (let i = start; i <= endNumber; i++) {
      pagi.push(
        <Link key={i} href={{ pathname: "/stores", query: { page: i } }}>
          <span
            className={`px-3 py-2 rounded border shadow-sm bg-white ${
              i === parseInt(page, 10)
                ? "text-blue-600 font-bold"
                : "text-gray-300"
            }`}
          >
            {i}
          </span>
        </Link>
      );
    }
    return pagi;
  };
  return (
    <div className="py-6 w-full px-10 flex justify-center gap-3 bg-white my-10 flex-wrap text-black">
      {parseInt(page) > 1 && (
        <Link
          href={{
            pathname: "/stores",
            query: { page: parseInt(page) - 1 },
          }}
        >
          <span className={`px-3 py-2 rounded border shadow-sm bg-white`}>
            이전
          </span>
        </Link>
      )}
      {getPagiList()}
      {total > parseInt(page) && (
        <Link
          href={{
            pathname: "/stores",
            query: { page: parseInt(page) + 1 },
          }}
        >
          <span className={`px-3 py-2 rounded border shadow-sm bg-white`}>
            다음
          </span>
        </Link>
      )}
    </div>
  );
}
