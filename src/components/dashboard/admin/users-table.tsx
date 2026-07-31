"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { UserStatusToggle } from "@/components/dashboard/admin/user-status-toggle";
import type { User } from "@/types/api";

const PAGE_SIZE = 10;

export function UsersTable({ users }: { users: User[] }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }, [users, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page_ = Math.min(page, totalPages);
  const pageUsers = filtered.slice((page_ - 1) * PAGE_SIZE, page_ * PAGE_SIZE);

  return (
    <div className="space-y-4">
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-soft" />
        <Input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          placeholder="Search name or email..."
          className="pl-9"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
              <th className="pb-2 font-medium">Name</th>
              <th className="pb-2 font-medium">Email</th>
              <th className="pb-2 font-medium">Role</th>
              <th className="pb-2 font-medium">Status</th>
              <th className="pb-2 font-medium">Joined</th>
              <th className="pb-2 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {pageUsers.map((user) => (
              <tr key={user.id} className="border-b border-border last:border-0">
                <td className="py-3 font-medium text-foreground">{user.name}</td>
                <td className="py-3 text-muted-foreground">{user.email}</td>
                <td className="py-3">
                  <span className="font-mono text-xs uppercase text-trail">{user.role}</span>
                </td>
                <td className="py-3">
                  <StatusBadge status={user.status} />
                </td>
                <td className="py-3 text-muted-foreground">
                  {format(new Date(user.createdAt), "MMM d, yyyy")}
                </td>
                <td className="py-3">
                  <UserStatusToggle userId={user.id} status={user.status} />
                </td>
              </tr>
            ))}
            {pageUsers.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-muted-foreground">
                  No users match &quot;{search}&quot;.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page_ <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous
          </Button>
          <span className="font-mono text-xs text-muted-foreground">
            Page {page_} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page_ >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
