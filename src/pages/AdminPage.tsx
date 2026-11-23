import { AdminSettings } from "../components/admin/AdminSettings";
import { ResourceForm } from "../components/admin/ResourceForm";
import { ResourceList } from "../components/admin/ResourceList";
import { useAdminResource } from "../hooks/useAdminResource";
import { ADMIN_RESOURCES } from "../lib/admin";
import type { ResourceName } from "../lib/types";

export function AdminPage() {
  const admin = useAdminResource();

  return (
    <div className="space-y-8">
      <AdminSettings
        adminKey={admin.adminKey}
        onKey={admin.saveKey}
        resource={admin.resource}
        onResource={(value) => admin.changeResource(value as ResourceName)}
        resources={ADMIN_RESOURCES}
        message={admin.message}
      />

      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <ResourceForm
          resource={admin.resource}
          editingId={admin.editingId}
          values={admin.values}
          onChange={admin.setValues}
          onSubmit={admin.save}
          onCancel={admin.reset}
        />
        <ResourceList
          items={admin.page.data?.data ?? []}
          loading={admin.page.loading}
          error={admin.page.error}
          onRetry={admin.page.reload}
          onEdit={admin.edit}
          onDelete={(id) => void admin.remove(id)}
        />
      </div>
    </div>
  );
}
