'use client'

import { useState } from 'react'

export default function RegisterPage() {
    const [form, setForm] = useState({ name: '', email: '', password: '' })
    const [message, setMessage] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        })

        const data = await res.json()
        if (res.ok) {
            setMessage('สมัครสมาชิกสำเร็จ!')
            setForm({ name: '', email: '', password: '' })
        } else {
            setMessage(data.error || 'เกิดข้อผิดพลาด')
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md w-80">
                <h1 className="text-xl mb-4 text-center font-bold">สมัครสมาชิก</h1>
                <input
                    type="text"
                    placeholder="ชื่อ"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full mb-2 p-2 border rounded"
                />
                <input
                    type="email"
                    placeholder="อีเมล"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full mb-2 p-2 border rounded"
                />
                <input
                    type="password"
                    placeholder="รหัสผ่าน"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full mb-4 p-2 border rounded"
                />
                <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    สมัครสมาชิก
                </button>
                {message && <p className="mt-3 text-center text-sm text-gray-600">{message}</p>}
            </form>
        </div>
    )
}
