import * as React from 'react'

export function AuthorCard() {
  return (
    <div className="bg-white border border-gray-100 rounded-lg p-8 text-center mb-12">
      <h4 className="font-heading font-bold uppercase tracking-wider mb-6 pb-2 border-b-2 border-primary inline-block">
        About The Author
      </h4>
      <div className="w-24 h-24 mx-auto rounded-full bg-dark flex items-center justify-center text-primary text-4xl font-black mb-4">
        S
      </div>
      <h5 className="font-heading font-bold text-lg mb-2">Sportoid Team</h5>
      <p className="text-gray-600 text-sm leading-relaxed mb-6">
        A team of sports management professionals bringing insights, strategies, and stories from the world of sports.
      </p>
      <div className="flex justify-center gap-2">
        <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-primary hover:text-primary transition-colors">f</button>
        <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-primary hover:text-primary transition-colors">t</button>
        <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-primary hover:text-primary transition-colors">in</button>
      </div>
    </div>
  )
}
