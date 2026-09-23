"use client";

import { useState } from "react";
import {
  Settings,
  User,
  Bell,
  Shield,
  Save,
  ChevronRight,
  Globe,
  Mail,
  Phone,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  ToggleLeft,
  ToggleRight,
  Trash2,
  Plus,
  Check,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const TABS = [
  { id: "general", label: "General", icon: Settings },
  { id: "profile", label: "Admin Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
];

const ADMIN_EMAILS = [
  { email: "admin@bostamieducation.com", role: "Super Admin", added: "Sep 1, 2025" },
  { email: "rakibul@bostamieducation.com", role: "Admin", added: "Sep 10, 2025" },
];

export default function AdminSettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("general");
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);

  const [toggles, setToggles] = useState({
    newEnrollment: true,
    paymentAlert: true,
    studentMessage: false,
    weeklyReport: true,
    smsAlert: false,
    browserPush: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const Toggle = ({ id }: { id: keyof typeof toggles }) => (
    <button
      onClick={() => setToggles((p) => ({ ...p, [id]: !p[id] }))}
      className="cursor-pointer transition-all"
    >
      {toggles[id] ? (
        <ToggleRight size={32} className="text-amber-400" />
      ) : (
        <ToggleLeft size={32} className="text-slate-600" />
      )}
    </button>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2.5">
            <Settings size={22} className="text-amber-500" />
            Settings
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage your admin panel preferences and configurations
          </p>
        </div>
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-md cursor-pointer ${
            saved
              ? "bg-emerald-500 text-white shadow-emerald-200"
              : "bg-amber-400 hover:bg-amber-500 text-slate-900 shadow-amber-200"
          }`}
        >
          {saved ? <Check size={16} /> : <Save size={16} />}
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Tabs */}
        <aside className="w-52 shrink-0 space-y-1">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                activeTab === id
                  ? "bg-amber-400/10 text-amber-600 border border-amber-400/20 shadow-sm"
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              }`}
            >
              <Icon size={17} />
              {label}
              {activeTab === id && (
                <ChevronRight size={14} className="ml-auto" />
              )}
            </button>
          ))}
        </aside>

        {/* Content Panel */}
        <div className="flex-1 space-y-5">
          {/* ── GENERAL ── */}
          {activeTab === "general" && (
            <>
              <Section title="Site Information" subtitle="Basic details about your education platform">
                <Field label="Platform Name" icon={<Globe size={15} />}>
                  <input defaultValue="Bostami Education" className={inputCls} />
                </Field>
                <Field label="Contact Email" icon={<Mail size={15} />}>
                  <input defaultValue="contact@bostamieducation.com" type="email" className={inputCls} />
                </Field>
                <Field label="Support Phone" icon={<Phone size={15} />}>
                  <input defaultValue="+880 1700-000000" className={inputCls} />
                </Field>
                <Field label="Address" icon={<MapPin size={15} />}>
                  <input defaultValue="Dhaka, Bangladesh" className={inputCls} />
                </Field>
              </Section>

              <Section title="Authorized Admin Emails" subtitle="Only these emails can access the admin dashboard">
                <div className="space-y-2">
                  {ADMIN_EMAILS.map((a) => (
                    <div key={a.email} className="flex items-center justify-between px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl group">
                      <div>
                        <div className="text-sm font-semibold text-slate-800">{a.email}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{a.role} · Added {a.added}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-400/15 text-amber-600 px-2 py-0.5 rounded-full border border-amber-400/20">
                          {a.role}
                        </span>
                        <button className="p-1.5 text-slate-300 hover:text-rose-400 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer opacity-0 group-hover:opacity-100">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-slate-300 rounded-xl text-sm text-slate-400 hover:border-amber-400 hover:text-amber-500 transition-colors cursor-pointer">
                    <Plus size={15} />
                    Add Admin Email
                  </button>
                </div>
                <div className="flex items-start gap-2.5 mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                  <AlertCircle size={15} className="text-amber-500 mt-0.5 shrink-0" />
                  <p className="text-xs text-amber-700">
                    Admin emails are stored in <code className="font-mono bg-amber-100 px-1 rounded">src/constants/adminConfig.ts</code>. Update the file directly to apply changes.
                  </p>
                </div>
              </Section>
            </>
          )}

          {/* ── PROFILE ── */}
          {activeTab === "profile" && (
            <Section title="Admin Profile" subtitle="Your personal admin account details">
              <div className="flex items-center gap-5 pb-5 border-b border-slate-100 mb-5">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center font-bold text-3xl text-slate-900 shadow-md shadow-amber-200">
                  {user?.displayName?.charAt(0).toUpperCase() ?? "A"}
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-lg">{user?.displayName || "Admin User"}</div>
                  <div className="text-sm text-slate-400">{user?.email}</div>
                  <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Super Admin
                  </div>
                </div>
              </div>
              <Field label="Display Name" icon={<User size={15} />}>
                <input defaultValue={user?.displayName || ""} placeholder="Enter display name" className={inputCls} />
              </Field>
              <Field label="Email Address" icon={<Mail size={15} />}>
                <input defaultValue={user?.email || ""} type="email" disabled className={`${inputCls} opacity-60 cursor-not-allowed`} />
              </Field>
              <Field label="Phone Number" icon={<Phone size={15} />}>
                <input placeholder="+880 1700-000000" className={inputCls} />
              </Field>
            </Section>
          )}

          {/* ── NOTIFICATIONS ── */}
          {activeTab === "notifications" && (
            <Section title="Notification Preferences" subtitle="Control when and how you receive alerts">
              <div className="divide-y divide-slate-100">
                <NotifRow label="New Enrollment" desc="Get notified when a student submits an enrollment form">
                  <Toggle id="newEnrollment" />
                </NotifRow>
                <NotifRow label="Payment Alerts" desc="Receive alerts for bKash/Nagad payment submissions">
                  <Toggle id="paymentAlert" />
                </NotifRow>
                <NotifRow label="Student Messages" desc="Notify when students send a message or query">
                  <Toggle id="studentMessage" />
                </NotifRow>
                <NotifRow label="Weekly Report" desc="Auto-send a weekly enrollment & revenue summary">
                  <Toggle id="weeklyReport" />
                </NotifRow>
                <NotifRow label="SMS Alerts" desc="Receive critical alerts via SMS on your phone">
                  <Toggle id="smsAlert" />
                </NotifRow>
                <NotifRow label="Browser Push Notifications" desc="Enable push notifications in your browser">
                  <Toggle id="browserPush" />
                </NotifRow>
              </div>
            </Section>
          )}

          {/* ── SECURITY ── */}
          {activeTab === "security" && (
            <>
              <Section title="Change Password" subtitle="Update your admin account password">
                <Field label="Current Password" icon={<Lock size={15} />}>
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"} placeholder="••••••••" className={`${inputCls} pr-10`} />
                    <button
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </Field>
                <Field label="New Password" icon={<Lock size={15} />}>
                  <input type="password" placeholder="••••••••" className={inputCls} />
                </Field>
                <Field label="Confirm New Password" icon={<Lock size={15} />}>
                  <input type="password" placeholder="••••••••" className={inputCls} />
                </Field>
                <button className="mt-2 px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-sm font-bold transition-all shadow-md shadow-rose-100 cursor-pointer">
                  Update Password
                </button>
              </Section>

              <Section title="Active Sessions" subtitle="Devices currently logged into the admin panel">
                {[
                  { device: "Chrome · Windows 11", location: "Dhaka, BD", time: "Now (current)", current: true },
                  { device: "Firefox · Android", location: "Chittagong, BD", time: "2 hours ago", current: false },
                ].map((s) => (
                  <div key={s.device} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                    <div>
                      <div className="text-sm font-semibold text-slate-800">{s.device}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{s.location} · {s.time}</div>
                    </div>
                    {s.current ? (
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                        This Device
                      </span>
                    ) : (
                      <button className="text-xs text-rose-500 hover:text-rose-700 font-semibold cursor-pointer">
                        Revoke
                      </button>
                    )}
                  </div>
                ))}
              </Section>

              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3">
                <AlertCircle size={17} className="text-rose-500 mt-0.5 shrink-0" />
                <div>
                  <div className="text-sm font-bold text-rose-700 mb-0.5">Danger Zone</div>
                  <p className="text-xs text-rose-600 mb-3">
                    Deleting your admin account is permanent and cannot be undone.
                  </p>
                  <button className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer">
                    Delete Admin Account
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Shared sub-components ── */

const inputCls =
  "w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400 transition-all";

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
      <div className="pb-3 border-b border-slate-100">
        <div className="text-base font-bold text-slate-800">{title}</div>
        <div className="text-xs text-slate-400 mt-0.5">{subtitle}</div>
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-slate-600 flex items-center gap-1.5 mb-1.5">
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}

function NotifRow({
  label,
  desc,
  children,
}: {
  label: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between py-4">
      <div>
        <div className="text-sm font-semibold text-slate-800">{label}</div>
        <div className="text-xs text-slate-400 mt-0.5">{desc}</div>
      </div>
      {children}
    </div>
  );
}
