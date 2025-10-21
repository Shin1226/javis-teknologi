// FE/src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, 
  Clock, 
  Briefcase, 
  DollarSign, 
  Calendar,
  Bell, 
  Settings,
  LogOut,
  Search,
  Menu,
  X,
  TrendingUp,
  FileText,
  PieChart,
  BarChart3,
  Download,
  Filter,
  Eye,
  Edit,
  Plus,
  CheckCircle2,
  AlertCircle,
  CalendarDays,
  Gift,
  Shield,
  CreditCard
} from 'lucide-react';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Data statistik utama
  const statsData = [
    { 
      title: 'Total Karyawan', 
      value: '128', 
      subtitle: 'orang',
      change: '+5 dari bulan lalu',
      trend: 'up',
      icon: <Users className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    { 
      title: 'Hadir Hari Ini', 
      value: '117', 
      subtitle: 'orang',
      change: '93% attendance rate',
      trend: 'up',
      icon: <Clock className="w-6 h-6" />,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20'
    },
    { 
      title: 'Proyek Aktif', 
      value: '8', 
      subtitle: 'proyek',
      change: '3 mendekati deadline',
      trend: 'warning',
      icon: <Briefcase className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    { 
      title: 'Total Gaji', 
      value: 'Rp 245', 
      subtitle: 'juta',
      change: 'Bulan Oktober 2024',
      trend: 'stable',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20'
    }
  ];

  // Data aktivitas terbaru
  const recentActivities = [
    { 
      id: 1, 
      employee: 'Rian Prasetyo',
      division: 'IT Developer',
      activity: 'Clock-in',
      time: '09:03',
      status: 'success',
      type: 'presensi'
    },
    { 
      id: 2, 
      employee: 'Admin Shindy',
      division: 'HRD',
      activity: 'Menambah data proyek baru',
      time: '09:05',
      status: 'info',
      type: 'system'
    },
    { 
      id: 3, 
      employee: 'Dea Oktaviani',
      division: 'Marketing',
      activity: 'Mengajukan cuti sakit',
      time: '09:12',
      status: 'warning',
      type: 'cuti'
    },
    { 
      id: 4, 
      employee: 'Tim IT',
      division: 'Technology',
      activity: 'Upload laporan sprint',
      time: '10:00',
      status: 'success',
      type: 'laporan'
    },
  ];

  // Data proyek aktif
  const activeProjects = [
    { 
      name: 'Mobile App Development', 
      progress: 75, 
      team: 8,
      deadline: '3 hari lagi',
      status: 'active',
      manager: 'Budi Santoso'
    },
    { 
      name: 'Website Company Profile', 
      progress: 45, 
      team: 4,
      deadline: '2 minggu',
      status: 'active',
      manager: 'Sari Dewi'
    },
    { 
      name: 'Sistem ERP Internal', 
      progress: 90, 
      team: 12,
      deadline: '1 minggu',
      status: 'completed',
      manager: 'Ahmad Fauzi'
    },
  ];

  // Data reminder
  const reminders = [
    {
      id: 1,
      type: 'warning',
      icon: <Bell className="w-4 h-4" />,
      message: '3 karyawan belum clock-in hari ini',
      detail: 'Lihat daftar'
    },
    {
      id: 2,
      type: 'deadline',
      icon: <CalendarDays className="w-4 h-4" />,
      message: 'Proyek Mobile App - Deadline: 3 hari lagi',
      detail: 'Periksa progress'
    },
    {
      id: 3,
      type: 'celebration',
      icon: <Gift className="w-4 h-4" />,
      message: 'Ulang tahun: Rina Dewi (Divisi HR)',
      detail: 'Kirim ucapan'
    }
  ];

  // Data grafik absensi (mock)
  const attendanceData = [
    { day: 'Sen', hadir: 120, terlambat: 5 },
    { day: 'Sel', hadir: 118, terlambat: 7 },
    { day: 'Rab', hadir: 122, terlambat: 3 },
    { day: 'Kam', hadir: 119, terlambat: 6 },
    { day: 'Jum', hadir: 117, terlambat: 8 },
  ];

  // Data divisi karyawan
  const divisionData = [
    { name: 'IT & Technology', value: 35, color: '#3B82F6' },
    { name: 'Marketing', value: 25, color: '#8B5CF6' },
    { name: 'HRD', value: 15, color: '#10B981' },
    { name: 'Finance', value: 12, color: '#F59E0B' },
    { name: 'Operations', value: 13, color: '#EF4444' },
  ];

  const handleLogout = () => {
    logout();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400';
      case 'warning': return 'text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400';
      case 'info': return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getReminderColor = (type) => {
    switch (type) {
      case 'warning': return 'border-amber-200 bg-amber-50 dark:bg-amber-900/10 dark:border-amber-800';
      case 'deadline': return 'border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-800';
      case 'celebration': return 'border-purple-200 bg-purple-50 dark:bg-purple-900/10 dark:border-purple-800';
      default: return 'border-gray-200 bg-gray-50 dark:bg-gray-900/10 dark:border-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-inter">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              
<div className="flex items-center space-x-3">
  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow border border-gray-200">
    <img 
      src="/assets/logo.png" 
      alt="JAVIS TEKNOLOGI"
      className="w-8 h-8 object-contain"
      onError={(e) => {
        // Fallback jika logo tidak ditemukan
        e.target.style.display = 'none';
        const fallback = document.createElement('div');
        fallback.className = 'w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded flex items-center justify-center';
        fallback.innerHTML = '<span class="text-white font-bold text-xs">JT</span>';
        e.target.parentNode.appendChild(fallback);
      }}
    />
  </div>
  <div className="hidden sm:block">
    <h1 className="text-lg font-bold text-gray-900 dark:text-white">
      JAVIS TEKNOLOGI ALBAROKAH
    </h1>
    <p className="text-xs text-gray-500 dark:text-gray-400">
      Employee Management System
    </p>
  </div>
</div>
            </div>

            {/* Center Section - Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Cari karyawan, proyek, atau laporan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <button className="relative p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              {/* User Profile */}
              <div className="flex items-center space-x-3">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name || 'Admin'}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-xs">
                    {user?.name?.split(' ').map(n => n[0]).join('') || 'A'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
          <div className="flex flex-col h-full">
            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-1">
              {[
                { id: 'dashboard', label: 'Dashboard Overview', icon: BarChart3 },
                { id: 'karyawan', label: 'Karyawan', icon: Users },
                { id: 'presensi', label: 'Presensi / Absensi', icon: Clock },
                { id: 'proyek', label: 'Proyek & Divisi', icon: Briefcase },
                { id: 'gaji', label: 'Gaji & Payroll', icon: DollarSign },
                { id: 'laporan', label: 'Laporan', icon: FileText },
                { id: 'pengaturan', label: 'Pengaturan', icon: Settings },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    activeTab === item.id 
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800' 
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Bottom Actions */}
            <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700 space-y-1">
              <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200">
                <Settings className="w-5 h-5" />
                <span className="font-medium text-sm">Pengaturan Sistem</span>
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium text-sm">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 text-white mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">Selamat datang kembali, {user?.name || 'Admin'}! 👋</h1>
                <p className="text-blue-100">
                  Berikut ringkasan aktivitas dan data karyawan hari ini.
                </p>
              </div>
              <div className="mt-4 lg:mt-0">
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{new Date().toLocaleDateString('id-ID', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {statsData.map((stat, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color} text-white shadow`}>
                    {stat.icon}
                  </div>
                  <div className={`text-xs font-medium ${
                    stat.trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 
                    stat.trend === 'warning' ? 'text-amber-600 dark:text-amber-400' : 
                    'text-gray-600 dark:text-gray-400'
                  }`}>
                    {stat.change}
                  </div>
                </div>
                <div className="flex items-end space-x-1 mb-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400 mb-1">{stat.subtitle}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Aktivitas & Grafik */}
            <div className="lg:col-span-2 space-y-6">
              {/* Aktivitas Terbaru */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Aktivitas Terbaru</h2>
                  <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300 flex items-center space-x-1">
                    <span>Lihat Semua</span>
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-3">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(activity.status)}`}>
                        {activity.status === 'success' && <CheckCircle2 className="w-4 h-4" />}
                        {activity.status === 'warning' && <AlertCircle className="w-4 h-4" />}
                        {activity.status === 'info' && <TrendingUp className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {activity.employee}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {activity.activity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.time}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{activity.division}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grafik & Proyek */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Grafik Absensi */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Absensi Minggu Ini</h3>
                  <div className="space-y-3">
                    {attendanceData.map((day, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400 w-8">{day.day}</span>
                        <div className="flex-1 mx-3">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${(day.hadir / 128) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white w-12 text-right">
                          {day.hadir}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Proyek Aktif */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Proyek Aktif</h3>
                    <button className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-300">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {activeProjects.map((project, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {project.name}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            project.status === 'completed' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400' :
                            'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                          }`}>
                            {project.status === 'completed' ? 'Selesai' : 'Aktif'}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              project.status === 'completed' ? 'bg-emerald-500' : 'bg-blue-500'
                            }`}
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span>Team: {project.team} orang</span>
                          <span>Deadline: {project.deadline}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Reminder & Divisi */}
            <div className="space-y-6">
              {/* Reminder */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Pengingat</h3>
                <div className="space-y-3">
                  {reminders.map((reminder) => (
                    <div key={reminder.id} className={`p-3 rounded-lg border ${getReminderColor(reminder.type)} transition-all hover:shadow-sm`}>
                      <div className="flex items-start space-x-3">
                        <div className={`p-1 rounded ${
                          reminder.type === 'warning' ? 'text-amber-600 bg-amber-100 dark:bg-amber-900/30' :
                          reminder.type === 'deadline' ? 'text-red-600 bg-red-100 dark:bg-red-900/30' :
                          'text-purple-600 bg-purple-100 dark:bg-purple-900/30'
                        }`}>
                          {reminder.icon}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                            {reminder.message}
                          </p>
                          <button className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                            {reminder.detail} →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Distribusi Divisi */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Distribusi Divisi</h3>
                <div className="space-y-3">
                  {divisionData.map((division, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: division.color }}
                        ></div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {division.name}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {division.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Aksi Cepat</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                    <Users className="w-5 h-5 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                    <span className="text-xs font-medium text-blue-700 dark:text-blue-300 text-center block">
                      Tambah Karyawan
                    </span>
                  </button>
                  <button className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors">
                    <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
                    <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300 text-center block">
                      Generate Laporan
                    </span>
                  </button>
                  <button className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
                    <Download className="w-5 h-5 text-amber-600 dark:text-amber-400 mx-auto mb-2" />
                    <span className="text-xs font-medium text-amber-700 dark:text-amber-300 text-center block">
                      Export Data
                    </span>
                  </button>
                  <button className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                    <Filter className="w-5 h-5 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                    <span className="text-xs font-medium text-purple-700 dark:text-purple-300 text-center block">
                      Filter Data
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              © 2025 PT Javis Teknologi Albarokah | Sistem Manajemen Karyawan
            </p>
          </footer>
        </main>
      </div>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Dashboard;