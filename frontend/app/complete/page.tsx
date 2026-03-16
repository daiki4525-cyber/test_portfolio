"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function AccountCompletePage() {
  return (
    <>
      <Header />

      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow text-center">
          <h1 className="text-2xl font-bold mb-4">
            変更が完了しました
          </h1>

          <p className="text-gray-600 mb-6">
            会員情報の変更が正常に完了しました。
          </p>

          <Link
            href="/"
            className="inline-block w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition"
          >
            トップページに戻る
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
