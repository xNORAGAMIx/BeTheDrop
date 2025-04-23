import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-[#0f0f1a] text-gray-200 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6 md:px-12 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 z-10">
          {/* Text Content */}
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              <span className="bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
                BeTheDrop
              </span>{" "}
              - Your Blood Saves Lives 🩸
            </h1>
            <p className="text-lg text-gray-300">
              Join our network of life-savers. Whether you're a donor, hospital, 
              or organization, together we can ensure no one suffers from blood shortages.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <Link
                to="/profile"
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition duration-300 shadow-lg hover:shadow-red-500/30"
              >
                Become a Donor
              </Link>
              <Link
                to="/hospital"
                className="border border-red-500 text-red-400 hover:bg-[#16213e] px-6 py-3 rounded-lg transition duration-300"
              >
                Affiliated Hospitals
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="md:w-1/2 flex justify-center">
            <img
              src="./banner.jpg"
              alt="Blood donation"
              className="w-full max-w-md rounded-xl border-2 border-[#16213e] shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#1a1a2e]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Our <span className="text-red-400">Impact</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "❤️",
                count: "1,500+",
                label: "Lives Saved",
                desc: "Through timely donations"
              },
              {
                icon: "🩸",
                count: "5,200+",
                label: "Units Collected",
                desc: "Across our network"
              },
              {
                icon: "🏥",
                count: "300+",
                label: "Partners",
                desc: "Hospitals & organizations"
              },
            ].map((item, idx) => (
              <div 
                key={idx}
                className="bg-[#16213e] p-8 rounded-xl border border-[#1a1a2e] hover:border-red-500/30 transition duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-4xl font-bold text-red-400 mb-2">{item.count}</h3>
                <p className="text-xl font-medium text-white">{item.label}</p>
                <p className="mt-2 text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-[#0f0f1a]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-white mb-4">
            How <span className="text-red-400">It Works</span>
          </h2>
          <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
            Simple steps to become a life-saver in your community
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              {
                step: "1",
                title: "Register",
                desc: "Create your profile in minutes",
                icon: "📝"
              },
              {
                step: "2",
                title: "Get Matched",
                desc: "We notify you when you're needed",
                icon: "🔔"
              },
              {
                step: "3",
                title: "Donate",
                desc: "Visit a nearby center and save lives",
                icon: "💉"
              }
            ].map((item, idx) => (
              <div 
                key={idx}
                className="bg-[#1a1a2e] p-8 rounded-xl border border-[#16213e] hover:shadow-lg hover:shadow-red-500/10 transition duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                    {item.step}
                  </span>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-gray-400 mb-4">{item.desc}</p>
                <div className="text-4xl text-red-400">{item.icon}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Callout */}
      <section className="py-16 bg-gradient-to-r from-red-900 to-red-700">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Urgent Blood Needs
          </h2>
          <p className="text-xl text-red-100 max-w-3xl mx-auto mb-8">
            These blood types are currently in critical shortage in your area
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {['A+', 'B-', 'O+', 'AB-'].map(type => (
              <div 
                key={type}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-8 py-4"
              >
                <span className="text-2xl font-bold text-white">{type}</span>
              </div>
            ))}
          </div>
          <Link
            to="/emergency"
            className="inline-block bg-white text-red-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition duration-300 shadow-lg"
          >
            View All Emergency Requests
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#1a1a2e]">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Stories of <span className="text-red-400">Hope</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote: "This platform connected me with a donor when my daughter needed emergency surgery. Forever grateful.",
                author: "Sarah K., Mother",
                role: "Recipient"
              },
              {
                quote: "As a regular donor, I love how easy it is to schedule donations and track my impact.",
                author: "Michael T.",
                role: "Donor (12 donations)"
              }
            ].map((testimonial, idx) => (
              <div 
                key={idx}
                className="bg-[#16213e] p-8 rounded-xl border border-[#1a1a2e]"
              >
                <p className="text-xl italic text-gray-300 mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="bg-red-500/20 text-red-400 w-12 h-12 rounded-full flex items-center justify-center">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white">{testimonial.author}</p>
                    <p className="text-sm text-red-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f0f1a] border-t border-[#16213e] py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Logo */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-red-500 text-2xl">🩸</span>
                <span className="text-xl font-bold text-white">BeTheDrop</span>
              </div>
              <p className="text-gray-400">
                Connecting donors with those in need since 2023
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/donate" className="text-gray-400 hover:text-red-400 transition">Donate Blood</Link></li>
                <li><Link to="/request" className="text-gray-400 hover:text-red-400 transition">Request Blood</Link></li>
                <li><Link to="/faq" className="text-gray-400 hover:text-red-400 transition">FAQ</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-red-400 transition">Contact Us</Link></li>
              </ul>
            </div>

            {/* Organization */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">For Organizations</h4>
              <ul className="space-y-2">
                <li><Link to="/hospital-register" className="text-gray-400 hover:text-red-400 transition">Hospital Registration</Link></li>
                <li><Link to="/blood-drives" className="text-gray-400 hover:text-red-400 transition">Host a Blood Drive</Link></li>
                <li><Link to="/partnerships" className="text-gray-400 hover:text-red-400 transition">Partnerships</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
              <address className="text-gray-400 not-italic">
                <p>123 Life Saver Ave</p>
                <p>Health City, HC 12345</p>
                <p className="mt-2">emergency@betherop.org</p>
                <p>+1 (800) DONATE-NOW</p>
              </address>
            </div>
          </div>

          <div className="border-t border-[#16213e] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © 2023 BeTheDrop. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link to="/privacy" className="text-gray-500 hover:text-red-400 text-sm">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-500 hover:text-red-400 text-sm">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;