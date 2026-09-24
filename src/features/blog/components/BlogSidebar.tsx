'use client'

import * as React from 'react'
import Link from 'next/link'
import { Activity, Trophy, Handshake } from 'lucide-react'

export function BlogSidebar() {
  return (
    <aside className="w-full space-y-12">
      {/* Search */}
      <div className="relative">
        <input 
          type="text" 
          placeholder="Search articles..." 
          className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-primary"
        />
        <button className="absolute right-0 top-0 bottom-0 bg-primary text-white px-4 rounded-r-md hover:bg-red-700 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
      </div>

      {/* Categories */}
      <div>
        <h4 className="font-heading font-semibold uppercase tracking-wider mb-6 pb-2 border-b-2 border-gray-100">
          Categories
        </h4>
        <ul className="space-y-4">
          <li className="flex items-center justify-between text-gray-600 hover:text-primary cursor-pointer transition-colors">
            <span className="flex items-center"><Activity className="w-4 h-4 mr-3" /> Cricket</span>
            <span className="text-gray-400 text-sm">(25)</span>
          </li>
          <li className="flex items-center justify-between text-gray-600 hover:text-primary cursor-pointer transition-colors">
            <span className="flex items-center"><Trophy className="w-4 h-4 mr-3" /> Sports Management</span>
            <span className="text-gray-400 text-sm">(18)</span>
          </li>
          <li className="flex items-center justify-between text-gray-600 hover:text-primary cursor-pointer transition-colors">
            <span className="flex items-center"><Handshake className="w-4 h-4 mr-3" /> Sponsorship</span>
            <span className="text-gray-400 text-sm">(14)</span>
          </li>
        </ul>
        <button className="text-primary font-semibold text-sm uppercase tracking-wider mt-6 hover:text-red-700">
          View All Categories →
        </button>
      </div>

      {/* Popular Posts */}
      <div>
        <h4 className="font-heading font-semibold uppercase tracking-wider mb-6 pb-2 border-b-2 border-gray-100">
          Popular Posts
        </h4>
        <div className="space-y-6">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center gap-4 group cursor-pointer">
              <div className="text-2xl font-heading font-semibold text-gray-300 group-hover:text-primary transition-colors">
                0{num}
              </div>
              <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0"></div>
              <div>
                <h5 className="font-semibold text-sm text-dark group-hover:text-primary transition-colors leading-tight mb-1">
                  The Power of Sports Branding
                </h5>
                <div className="text-xs text-gray-500">May 10, 2024</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Newsletter */}
      <div className="bg-light p-8 rounded-lg border border-gray-100">
        <h4 className="font-heading font-semibold uppercase tracking-wider mb-4">
          Subscribe to our newsletter
        </h4>
        <p className="text-gray-600 text-sm mb-6">
          Get the latest insights, news and updates delivered to your inbox.
        </p>
        <div className="relative">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-primary text-sm"
          />
          <button className="absolute right-0 top-0 bottom-0 bg-primary text-white px-4 rounded-r-md hover:bg-red-700 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </div>
      </div>
    </aside>
  )
}
