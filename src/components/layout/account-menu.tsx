"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useRef, useState } from "react";
import { LayoutDashboard, LogOut, Camera, Loader2, UserCircle } from "lucide-react";
import { toast } from "sonner";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { bffFetch } from "@/lib/api-client";
import { dashboardPathForRole } from "@/lib/roles";
import type { Role } from "@/types/api";

interface Props {
  name: string;
  email: string;
  role: Role;
  avatarUrl: string | null;
}

export function AccountMenu({ name, email, role, avatarUrl }: Props) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(avatarUrl);

  async function handleLogout() {
    try {
      await bffFetch("/api/auth/logout", { method: "POST" });
      router.push("/");
      router.refresh();
    } catch {
      toast.error("Couldn't log out — try again");
    }
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Local preview immediately
    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await fetch("/api/auth/upload-avatar", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Upload failed");

      setPreview(json.data?.avatarUrl ?? localUrl);
      toast.success("Profile picture updated!");
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
      setPreview(avatarUrl); // revert on error
    } finally {
      setUploading(false);
      // reset so same file can be re-selected
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="group relative flex size-9 items-center justify-center rounded-full outline-none ring-2 ring-transparent transition-all focus-visible:ring-blaze hover:ring-blaze/50"
          aria-label="Account menu"
        >
          {/* Avatar image or initial */}
          {preview ? (
            <Image
              src={preview}
              alt={name}
              fill
              sizes="36px"
              className="rounded-full object-cover"
            />
          ) : (
            <span className="flex size-9 items-center justify-center rounded-full bg-trail text-sm font-bold text-white shadow-md shadow-trail/30 transition-all group-hover:bg-trail-light">
              {name.charAt(0).toUpperCase()}
            </span>
          )}

          {/* Upload overlay on hover */}
          <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            {uploading
              ? <Loader2 className="size-3.5 animate-spin text-white" />
              : <Camera className="size-3.5 text-white" />
            }
          </span>

          {/* Hidden file input triggered by overlay click */}
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="absolute inset-0 cursor-pointer rounded-full opacity-0"
            onChange={handleAvatarChange}
            disabled={uploading}
            aria-label="Upload profile picture"
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="glass-strong w-56 rounded-xl border-white/20 p-1.5">
        <DropdownMenuLabel className="px-2 py-2">
          <div className="flex items-center gap-2.5">
            {/* Mini avatar in menu */}
            <div className="relative size-8 shrink-0">
              {preview ? (
                <Image src={preview} alt={name} fill sizes="32px" className="rounded-full object-cover" />
              ) : (
                <span className="flex size-8 items-center justify-center rounded-full bg-trail text-xs font-bold text-white">
                  {name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-pine dark:text-pine">{name}</p>
              <p className="truncate text-xs text-slate">{email}</p>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-white/20" />

        {/* Change photo */}
        <DropdownMenuItem
          asChild
          className="cursor-pointer rounded-lg hover:bg-white/40"
          onSelect={(e) => { e.preventDefault(); fileRef.current?.click(); }}
        >
          <span className="flex items-center gap-2 text-sm">
            <UserCircle className="size-4" />
            {uploading ? "Uploading…" : "Change photo"}
          </span>
        </DropdownMenuItem>

        <DropdownMenuItem asChild className="rounded-lg hover:bg-white/40">
          <Link href={dashboardPathForRole(role)} className="flex items-center gap-2">
            <LayoutDashboard className="size-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-white/20" />

        <DropdownMenuItem
          onSelect={handleLogout}
          className="rounded-lg text-destructive hover:bg-destructive/10 focus:bg-destructive/10"
        >
          <LogOut className="size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
