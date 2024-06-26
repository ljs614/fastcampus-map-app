import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { BiMenu } from "react-icons/bi";
import { BiX } from "react-icons/bi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, status } = useSession();

  console.log(status);

  return (
    <>
      <div className="navbar">
        <div className="navbar__logo">
          <Link href="/">NextMap</Link>
        </div>
        <div className="navbar__list">
          <Link href="/stores" className="navbar__list--item">
            맛집 목록
          </Link>
          <Link href="/stores/new" className="navbar__list--item">
            맛집 등록
          </Link>
          <Link href="/users/likes" className="navbar__list--item">
            찜한 가게
          </Link>
          {status === "authenticated" ? (
            <button type="button" onClick={() => signOut()}>
              로그아웃
            </button>
          ) : (
            <Link href="/api/auth/signin" className="navbar__list--item">
              로그인
            </Link>
          )}
        </div>
        <div
          role="presentation"
          className="navbar__btn"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? <BiX /> : <BiMenu />}
        </div>
        {/* mobile navbar */}
        {isOpen && (
          <div className="navbar--mobile">
            <div className="navbar__list--mobile">
              <Link href="/stores" className="navbar__list--item--mobile">
                맛집 목록
              </Link>
              <Link href="/stores/new" className="navbar__list--item--mobile">
                맛집 등록
              </Link>
              <Link href="/users/likes" className="navbar__list--item--mobile">
                찜한 가게
              </Link>
              {status === "authenticated" ? (
                <button type="button" onClick={() => signOut()}>
                  로그아웃
                </button>
              ) : (
                <Link href="/api/auth/signin" className="navbar__list--item">
                  로그인
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
