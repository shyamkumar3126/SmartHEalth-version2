import React, { useState } from 'react';
import { 
  Search, MapPin, Star, Video, ShoppingCart, Plus, Upload, Trash2, 
  Activity, Filter, Info, ShieldCheck, Clock, FileText, ChevronRight, 
  Calendar, Lock, Mail, User, Home, Download, MessageSquare, Phone, TestTube2
} from 'lucide-react';
import { MOCK_DOCTORS, MOCK_MEDICINES, MOCK_LAB_TESTS, MOCK_CLINICS, MOCK_APPOINTMENTS, MOCK_USER } from '../constants';
import { Doctor, Medicine, LabTest, CartItem, HealthRecord, Clinic, UserProfile } from '../types';
import { BookingModal, PaymentModal } from './Modals';

// --- Shared Components ---
const SectionHeader: React.FC<{ title: string, subtitle?: string, children?: React.ReactNode }> = ({ title, subtitle, children }) => (
  <div className="mb-6">
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {children}
    </div>
  </div>
);

// --- Login View ---
export const LoginView: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center">
            <ShieldCheck size={32} className="text-white" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-primary-600 mb-1">Welcome Back</h2>
        <p className="text-center text-gray-400 mb-8">Sign in to manage your health</p>

        <div className="bg-primary-50 p-1 rounded-xl flex mb-6">
          <button className="flex-1 py-2 rounded-lg bg-primary-600 text-white text-sm font-semibold shadow-sm">PATIENT</button>
          <button className="flex-1 py-2 rounded-lg text-gray-400 text-sm font-semibold hover:text-primary-600">DOCTOR</button>
          <button className="flex-1 py-2 rounded-lg text-gray-400 text-sm font-semibold hover:text-primary-600">ADMIN</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input type="email" defaultValue="you@example.com" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
              <input type="password" defaultValue="........" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none" />
            </div>
          </div>
          
          <div className="text-right">
             <a href="#" className="text-sm text-primary-400 hover:text-primary-600">Forgot Password?</a>
          </div>

          <button onClick={onLogin} className="w-full bg-primary-600 text-white py-3.5 rounded-xl font-bold hover:bg-primary-700 transition shadow-lg shadow-primary-200 flex items-center justify-center gap-2">
            Sign In <ChevronRight size={18} />
          </button>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Don't have an account? <a href="#" className="text-primary-400 font-semibold hover:text-primary-600">Create Account</a>
        </p>
      </div>
    </div>
  );
};

// --- Dashboard View ---
export const DashboardView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-primary-600 to-[#5b21b6] rounded-3xl p-6 md:p-10 text-white relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Hello, {MOCK_USER.name}</h1>
          <p className="text-primary-100 mb-6 text-sm md:text-base leading-relaxed">
            Welcome to your health dashboard. You can manage your appointments, find specialists, and track your medical history here.
          </p>
          <button className="bg-white text-primary-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition shadow-md">
            Book New Appointment
          </button>
        </div>
        {/* Background Graphic */}
        <div className="absolute top-0 right-0 h-full w-1/2 opacity-10 pointer-events-none">
           <svg viewBox="0 0 100 100" className="h-full w-full" fill="currentColor">
              <path d="M0 50 Q 25 25 50 50 T 100 50" stroke="white" strokeWidth="2" fill="none" />
              <path d="M0 60 Q 25 35 50 60 T 100 60" stroke="white" strokeWidth="2" fill="none" />
           </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointment */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg flex items-center gap-2 text-gray-800">
              <Calendar className="text-primary-600" size={20} /> Upcoming Appointment
            </h3>
            <button className="text-sm text-primary-600 font-medium hover:underline">View all</button>
          </div>
          
          <div className="border border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-gray-50/50">
            {MOCK_APPOINTMENTS.length > 0 ? (
               <div className="w-full text-left">
                  {MOCK_APPOINTMENTS.slice(0,1).map(apt => (
                    <div key={apt.id} className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 font-bold">
                         {apt.date.split(' ')[0]}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{apt.doctorName}</h4>
                        <p className="text-sm text-gray-500">{apt.type} • {apt.time}</p>
                      </div>
                      <span className="ml-auto px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                        {apt.status}
                      </span>
                    </div>
                  ))}
               </div>
            ) : (
              <>
                <Calendar size={32} className="text-gray-300 mb-2" />
                <p className="text-gray-400 text-sm">No upcoming appointments scheduled.</p>
              </>
            )}
          </div>
        </div>

        {/* Health Status */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
             <h3 className="font-bold text-lg flex items-center gap-2 text-gray-800 mb-4">
               <Activity className="text-orange-500" size={20} /> Health Status
             </h3>
             <div className="space-y-4">
               <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                 <span className="text-gray-500 text-sm">BMI</span>
                 <span className="font-bold text-gray-900">{MOCK_USER.bmi}</span>
               </div>
               <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                 <span className="text-gray-500 text-sm">Blood Pressure</span>
                 <span className="font-bold text-gray-900">{MOCK_USER.bp}</span>
               </div>
               <div className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                 <span className="text-gray-500 text-sm">Heart Rate</span>
                 <span className="font-bold text-gray-900">{MOCK_USER.heartRate}</span>
               </div>
             </div>
          </div>

          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
             <h3 className="font-bold text-blue-900 flex items-center gap-2 mb-2">
               <Info size={18} /> Reminders
             </h3>
             <p className="text-sm text-blue-700 leading-relaxed">
               It's flu season! Don't forget to ask your doctor about the annual flu shot during your next visit.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Find Doctor View ---
export const DoctorsView: React.FC = () => {
  const [filter, setFilter] = useState('');
  
  return (
    <div>
      <SectionHeader title="Find a Specialist" subtitle="Book appointments with top doctors near you" />
      
      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
           <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
           <input type="text" placeholder="Search doctor name or keyword..." className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary-500" />
        </div>
        <div className="flex-1 relative">
           <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
           <input type="text" placeholder="Enter symptoms (e.g., chest pain...)" className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary-500" />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50">
          <Filter size={18} /> All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_DOCTORS.map(doc => (
          <div key={doc.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition">
            <div className="flex gap-4 mb-4">
               <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-lg font-bold text-primary-700 bg-primary-100`}>
                  {doc.name.split(' ').map(n=>n[0]).join('').substring(0,3).toUpperCase()}
               </div>
               <div>
                 <h3 className="font-bold text-primary-700 text-lg">{doc.name}</h3>
                 <p className="text-gray-500 text-sm">{doc.speciality}</p>
                 <div className="flex items-center gap-1 mt-1">
                   <Star size={14} className="text-yellow-400 fill-current" />
                   <span className="text-sm font-bold text-gray-900">{doc.rating}</span>
                   <span className="text-xs text-gray-400">({doc.experience} yrs exp)</span>
                 </div>
               </div>
            </div>
            
            <p className="text-sm text-gray-500 mb-4 line-clamp-2 min-h-[40px]">
              {doc.about}
            </p>

            <div className="flex justify-between items-center mb-6 text-sm">
               <span className="flex items-center gap-1 text-gray-500"><MapPin size={14} /> {doc.location}</span>
               <span className="font-bold text-primary-700">₹{doc.consultationFee}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="py-2.5 rounded-xl bg-gray-100 text-gray-700 font-medium text-sm hover:bg-gray-200">
                About Doctor
              </button>
              <button className="py-2.5 rounded-xl bg-primary-600 text-white font-medium text-sm hover:bg-primary-700 flex items-center justify-center gap-2 shadow-lg shadow-primary-200">
                <Calendar size={16} /> Book
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Appointments View ---
export const AppointmentsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming');

  return (
    <div>
      <SectionHeader title="My Appointments" subtitle="Track your visits and scheduled consultations" />

      <div className="flex gap-2 mb-6 bg-white p-1.5 rounded-xl w-fit border border-gray-100">
        <button 
          onClick={() => setActiveTab('upcoming')}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'upcoming' ? 'bg-[#0f766e] text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
        >
          Upcoming
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition ${activeTab === 'history' ? 'bg-[#0f766e] text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
        >
          History
        </button>
      </div>

      <div className="space-y-4">
        {MOCK_APPOINTMENTS.map(apt => (
           <div key={apt.id} className="bg-white rounded-2xl p-4 md:p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex gap-4 items-center">
                 <div className="bg-gray-50 rounded-xl p-3 text-center min-w-[70px]">
                    <span className="block text-xl font-bold text-gray-800">{apt.date.split(' ')[0]}</span>
                    <span className="block text-xs font-semibold text-gray-400 uppercase">{apt.date.split(' ')[1]}</span>
                 </div>
                 <div>
                    <div className="flex items-center gap-2">
                       <h3 className="font-bold text-lg text-gray-900">{apt.doctorName}</h3>
                       {apt.paymentStatus === 'Paid' && (
                         <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                           <ShieldCheck size={10} /> Paid
                         </span>
                       )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                       <span className="flex items-center gap-1"><Clock size={14} /> {apt.time}</span>
                       <span className="flex items-center gap-1"><MapPin size={14} /> {apt.type}</span>
                    </div>
                 </div>
              </div>
              
              <div className="flex gap-3 justify-end">
                <button className="px-4 py-2 border border-red-100 text-red-500 font-medium rounded-lg text-sm hover:bg-red-50">
                  Cancel
                </button>
                <button className="px-4 py-2 bg-[#0f766e] text-white font-medium rounded-lg text-sm hover:bg-[#115e59] shadow-sm">
                  Reschedule
                </button>
              </div>
           </div>
        ))}
      </div>
    </div>
  );
};

// --- Clinic Finder View ---
export const ClinicFinderView: React.FC = () => {
  return (
    <div>
      <SectionHeader title="Clinic & Hospital Finder" subtitle="Find nearby healthcare facilities" />
      
      {/* Search & Filters */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
             <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
             <input type="text" placeholder="Search clinics/hospitals..." className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-primary-500" />
          </div>
          <div className="w-full md:w-48 relative">
             <Filter className="absolute left-3 top-3.5 text-gray-400" size={18} />
             <select className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 outline-none bg-white appearance-none">
                <option>All Types</option>
                <option>Hospitals</option>
                <option>Clinics</option>
             </select>
          </div>
          <div className="w-full md:w-48 flex items-center px-4 border border-gray-200 rounded-xl bg-white">
             <span className="text-sm text-gray-500 mr-2">Max Distance: 10km</span>
             <input type="range" className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-600" />
          </div>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-sm font-medium text-gray-700">Min Rating:</span>
           <select className="border border-gray-200 rounded-lg py-1 px-2 text-sm bg-white outline-none">
             <option>All</option>
             <option>4.0+</option>
             <option>4.5+</option>
           </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_CLINICS.map(clinic => (
          <div key={clinic.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition h-full flex flex-col">
             <div className="flex justify-between items-start mb-4">
                <div className="h-32 w-full bg-gray-50 rounded-xl mb-4 absolute top-0 left-0 -z-10 hidden"></div> {/* Placeholder for structure */}
                <h3 className="font-bold text-lg text-primary-700">{clinic.name}</h3>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${clinic.type === 'Hospital' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                  {clinic.type}
                </span>
             </div>
             
             <div className="flex items-center gap-1 mb-6">
                <Star size={14} className="text-yellow-400 fill-current" />
                <span className="text-sm font-bold">{clinic.rating}</span>
             </div>

             <div className="space-y-3 text-sm text-gray-500 mb-6 flex-1">
                <div className="flex items-center gap-2">
                   <MapPin size={16} /> {clinic.address} • {clinic.distance}
                </div>
                <div className="flex items-center gap-2">
                   <Clock size={16} /> {clinic.timings}
                </div>
                <div className="flex items-center gap-2">
                   <Phone size={16} /> {clinic.phone}
                </div>
             </div>

             <div className="flex gap-2 flex-wrap">
                {clinic.tags.map(tag => (
                   <span key={tag} className="bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded-md font-medium">
                     {tag}
                   </span>
                ))}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Medicine View ---
export const PharmacyView: React.FC<{ onAddToCart: (item: CartItem) => void }> = ({ onAddToCart }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
         <div>
            <h1 className="text-2xl font-bold text-purple-600">Medicine Ordering</h1>
            <p className="text-gray-500">Order medicines online with prescription upload</p>
         </div>
         <button className="bg-purple-600 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 shadow-lg shadow-purple-200">
           <ShoppingCart size={16} /> Cart (0)
         </button>
      </div>

      <div className="flex gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search medicines..." 
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
          />
        </div>
        <div className="w-32 bg-white border border-gray-200 rounded-xl flex items-center justify-center font-medium">
          All
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {MOCK_MEDICINES.map(med => (
           <div key={med.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-2">
                 <h3 className="font-bold text-lg text-purple-700">{med.name}</h3>
              </div>
              <p className="text-gray-500 text-xs uppercase font-bold tracking-wide mb-1">{med.manufacturer}</p>
              <h4 className="text-purple-700 font-bold text-lg mb-4">₹{med.price}</h4>
              
              <p className="text-gray-500 text-sm mb-6 flex-1">
                {med.description}
              </p>
              
              <button 
                onClick={() => onAddToCart({id: crypto.randomUUID(), type: 'medicine', itemId: med.id, quantity: 1, price: med.price, name: med.name})}
                className="w-full py-3 bg-[#a855f7] text-white rounded-xl font-medium hover:bg-[#9333ea] transition shadow-md shadow-purple-200 flex items-center justify-center gap-2"
              >
                <Plus size={18} /> Add to Cart
              </button>
           </div>
         ))}
      </div>
    </div>
  );
};

// --- Lab Test View ---
export const LabsView: React.FC<{ onAddToCart: (item: CartItem) => void }> = ({ onAddToCart }) => {
  return (
    <div>
      <SectionHeader title="Lab Test Booking" />

      <div className="flex gap-6 items-start">
         <div className="flex-1">
            <div className="relative mb-6">
              <input 
                type="text" 
                placeholder="Search lab tests..." 
                className="w-full pl-4 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MOCK_LAB_TESTS.map(test => (
                 <div key={test.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{test.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">{test.preparation}</p>
                    
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-purple-700 font-bold text-lg">₹{test.price}</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-4">{test.category}</p>
                    
                    {test.homePickup && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mb-4">
                        <Home size={12} className="text-orange-500" /> Home pickup available
                      </div>
                    )}

                    <button 
                      onClick={() => onAddToCart({id: crypto.randomUUID(), type: 'test', itemId: test.id, quantity: 1, price: test.price, name: test.name})}
                      className="w-full py-2.5 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition"
                    >
                      Select Test
                    </button>
                 </div>
              ))}
            </div>
         </div>

         {/* Right Booking Summary Sidebar (Desktop) */}
         <div className="hidden lg:block w-80 bg-white rounded-2xl border border-gray-100 p-6 h-fit sticky top-24">
            <h3 className="font-bold text-lg text-gray-900 mb-4">Booking Summary</h3>
            <p className="text-gray-500 text-sm">No tests selected</p>
         </div>
      </div>
    </div>
  );
};

// --- Online Consult View ---
export const OnlineConsultView: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
       <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-purple-600 mb-2">Instant Doctor Consultation</h1>
          <p className="text-gray-500 max-w-md mx-auto">Get expert medical advice from qualified doctors through chat or video consultation.</p>
       </div>

       <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-2xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
             <div className="border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition group">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-500 group-hover:bg-white group-hover:text-primary-600">
                   <MessageSquare size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Chat Consultation</h3>
                <p className="text-xs text-gray-500 mb-2">Text-based consultation</p>
                <span className="font-bold text-gray-800">₹500</span>
             </div>

             <div className="border border-gray-200 rounded-xl p-6 flex flex-col items-center text-center cursor-pointer hover:border-primary-500 hover:bg-primary-50 transition group">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4 text-gray-500 group-hover:bg-white group-hover:text-primary-600">
                   <Video size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">Video Consultation</h3>
                <p className="text-xs text-gray-500 mb-2">Face-to-face consultation</p>
                <span className="font-bold text-gray-800">₹1000</span>
             </div>
          </div>

          <button className="w-full bg-[#64748b] text-white py-3 rounded-lg font-medium hover:bg-slate-600 transition">
             Consult Now - ₹500
          </button>
       </div>
    </div>
  );
};

// --- Health Records View ---
export const RecordsView: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-purple-600">Health Records</h1>
          <p className="text-gray-500 mt-1">Manage your prescriptions, reports, and test results</p>
        </div>
        <button className="bg-[#a855f7] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
          <Plus size={16} /> Upload Record
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Record 1 */}
         <div className="bg-[#f0f9ff] rounded-2xl p-6 border border-blue-100">
             <div className="flex items-start gap-3 mb-4">
                <FileText className="text-blue-600 mt-1" size={24} />
                <div>
                   <h3 className="font-bold text-gray-900 text-lg">Blood Pressure Medication</h3>
                   <p className="text-gray-500 text-sm">Prescription</p>
                   <p className="text-gray-400 text-xs mt-1">01/09/2023</p>
                </div>
             </div>
             <div className="flex gap-3 mt-4">
                <button className="flex-1 bg-white border border-gray-200 py-2 rounded-xl text-gray-700 font-medium text-sm hover:bg-gray-50 flex items-center justify-center gap-2">
                   <div className="w-4 h-4 rounded-full border border-gray-500 flex items-center justify-center"><div className="w-2 h-2 bg-gray-500 rounded-full"></div></div> View
                </button>
                <button className="flex-1 bg-[#a855f7] text-white py-2 rounded-xl font-medium text-sm hover:bg-[#9333ea] flex items-center justify-center gap-2 shadow-md shadow-purple-200">
                   <Download size={16} /> Download
                </button>
             </div>
         </div>
         {/* Record 2 */}
         <div className="bg-[#ecfdf5] rounded-2xl p-6 border border-green-100">
             <div className="flex items-start gap-3 mb-4">
                <FileText className="text-green-600 mt-1" size={24} />
                <div>
                   <h3 className="font-bold text-gray-900 text-lg">Annual Health Checkup Report</h3>
                   <p className="text-gray-500 text-sm">Report</p>
                   <p className="text-gray-400 text-xs mt-1">15/08/2023</p>
                </div>
             </div>
             <div className="flex gap-3 mt-4">
                <button className="flex-1 bg-white border border-gray-200 py-2 rounded-xl text-gray-700 font-medium text-sm hover:bg-gray-50 flex items-center justify-center gap-2">
                    <div className="w-4 h-4 rounded-full border border-gray-500 flex items-center justify-center"><div className="w-2 h-2 bg-gray-500 rounded-full"></div></div> View
                </button>
                <button className="flex-1 bg-[#a855f7] text-white py-2 rounded-xl font-medium text-sm hover:bg-[#9333ea] flex items-center justify-center gap-2 shadow-md shadow-purple-200">
                   <Download size={16} /> Download
                </button>
             </div>
         </div>
      </div>
    </div>
  );
};

// --- Profile View ---
export const ProfileView: React.FC = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
         <div>
            <h1 className="text-2xl font-bold text-gray-900">Account & Profile</h1>
            <p className="text-gray-500">Manage your personal data and system preferences</p>
         </div>
         <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700">Profile Information</button>
            <button className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-500">Settings</button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Left Col: Photo & Mini Cards */}
         <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 border border-gray-100 flex flex-col items-center text-center">
               <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-medium mb-4">
                  {MOCK_USER.name.split(' ').map(n => n[0]).join('')}
               </div>
               <h2 className="font-bold text-xl text-gray-900">{MOCK_USER.name}</h2>
               <p className="text-gray-500 text-sm mb-6">{MOCK_USER.email}</p>
               
               <div className="flex justify-between w-full px-4 pt-6 border-t border-gray-100">
                  <div className="text-center">
                     <p className="text-xs text-gray-400 uppercase font-bold">Blood Group</p>
                     <p className="text-green-600 font-bold">{MOCK_USER.bloodGroup}</p>
                  </div>
                  <div className="text-center">
                     <p className="text-xs text-gray-400 uppercase font-bold">Age</p>
                     <p className="text-gray-800 font-bold">{MOCK_USER.age}</p>
                  </div>
               </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
               <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
                  <FileText className="text-[#0f766e]" size={18} /> Medical Records
               </h3>
               <div className="border border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center text-center mb-4 cursor-pointer hover:bg-gray-50">
                  <Upload size={20} className="text-gray-400 mb-2" />
                  <p className="text-xs text-gray-500">Upload Report (PDF/JPG)</p>
               </div>
               <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <FileText size={16} className="text-[#0f766e]" />
                  <div className="flex-1 min-w-0">
                     <p className="text-xs font-medium truncate">Blood_Test_Report_May_2024.pdf</p>
                     <p className="text-[10px] text-gray-400">2024-05-15 • 2.4 MB</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Right Col: Details Form */}
         <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2"><User className="text-[#0f766e]" size={18}/> Personal Details</h3>
                  <button className="text-sm text-[#0f766e] bg-green-50 px-3 py-1 rounded-lg font-medium flex items-center gap-1">Edit Details</button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                     <label className="block text-xs font-semibold text-gray-500 mb-1">Full Name</label>
                     <input type="text" readOnly defaultValue={MOCK_USER.name} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-100 text-gray-700 text-sm" />
                  </div>
                  <div>
                     <label className="block text-xs font-semibold text-gray-500 mb-1">Email</label>
                     <input type="text" readOnly defaultValue={MOCK_USER.email} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-100 text-gray-700 text-sm" />
                  </div>
                  <div>
                     <label className="block text-xs font-semibold text-gray-500 mb-1">Phone Number</label>
                     <input type="text" readOnly defaultValue={MOCK_USER.phone} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-100 text-gray-700 text-sm" />
                  </div>
                  <div>
                     <label className="block text-xs font-semibold text-gray-500 mb-1">Date of Birth</label>
                     <input type="text" readOnly defaultValue={MOCK_USER.dob} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-100 text-gray-700 text-sm" />
                  </div>
                  <div className="md:col-span-2">
                     <label className="block text-xs font-semibold text-gray-500 mb-1">Address</label>
                     <div className="relative">
                        <MapPin className="absolute left-3 top-3 text-gray-400" size={16} />
                        <input type="text" readOnly defaultValue={MOCK_USER.address} className="w-full pl-9 p-3 bg-gray-50 rounded-xl border border-gray-100 text-gray-700 text-sm" />
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100">
               <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-6"><ShieldCheck className="text-red-500" size={18}/> Medical Information</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div>
                     <label className="block text-xs font-semibold text-gray-500 mb-1">Blood Group</label>
                     <select disabled className="w-full p-3 bg-gray-50 rounded-xl border border-gray-100 text-gray-700 text-sm appearance-none">
                        <option>O+</option>
                     </select>
                  </div>
                  <div>
                     <label className="block text-xs font-semibold text-gray-500 mb-1">Emergency Contact</label>
                     <input type="text" readOnly defaultValue={MOCK_USER.emergencyContact} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-100 text-gray-700 text-sm" />
                  </div>
                  <div>
                     <label className="block text-xs font-semibold text-gray-500 mb-1">Allergies</label>
                     <input type="text" readOnly placeholder="None" className="w-full p-3 bg-gray-50 rounded-xl border border-gray-100 text-gray-700 text-sm" />
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

// --- Cart View ---
export const CartView: React.FC<{ cart: CartItem[], onRemove: (id: string) => void }> = ({ cart, onRemove }) => {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const finalTotal = total + Math.round(total * 0.05);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
           <ShoppingCart size={48} />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added anything yet.</p>
      </div>
    );
  }

  return (
    <div>
      <SectionHeader title="Shopping Cart" subtitle="Review your selected medicines and tests" />
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${item.type === 'medicine' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                  {item.type === 'medicine' ? <ShoppingCart size={20} /> : <TestTube2 size={20} />}
                </div>
                <div>
                   <h3 className="font-bold text-gray-900">{item.name}</h3>
                   <p className="text-sm text-gray-500 capitalize">{item.type} • Qty: {item.quantity}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                 <span className="font-bold text-gray-900">₹{item.price * item.quantity}</span>
                 <button onClick={() => onRemove(item.id)} className="text-red-400 hover:text-red-600 bg-red-50 p-2 rounded-lg transition">
                   <Trash2 size={18} />
                 </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="w-full lg:w-80 h-fit bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
           <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
           <div className="space-y-2 mb-4 border-b border-gray-100 pb-4">
              <div className="flex justify-between text-sm text-gray-500">
                 <span>Subtotal</span>
                 <span>₹{total}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                 <span>Tax (5%)</span>
                 <span>₹{Math.round(total * 0.05)}</span>
              </div>
           </div>
           <div className="flex justify-between font-bold text-lg text-gray-900 mb-6">
              <span>Total</span>
              <span>₹{finalTotal}</span>
           </div>
           
           <button 
             onClick={() => setIsPaymentOpen(true)}
             className="w-full bg-primary-600 text-white py-3 rounded-xl font-bold hover:bg-primary-700 transition shadow-lg shadow-primary-200"
           >
             Proceed to Checkout
           </button>
        </div>
      </div>

      <PaymentModal 
        isOpen={isPaymentOpen} 
        onClose={() => setIsPaymentOpen(false)} 
        amount={finalTotal}
        onSuccess={() => {
           // In a real app we'd clear the cart here
           setIsPaymentOpen(false);
           alert("Order placed successfully! (Mock)");
        }}
      />
    </div>
  );
};