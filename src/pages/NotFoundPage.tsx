import { KioskLayout } from '@/components/layout/KioskLayout';
import { StateMessage } from '@/components/states/StateMessage';
import { useKioskNavigation } from '@/app/navigation';
import { useI18n } from '@/features/i18n/useI18n';

export default function NotFoundPage() {
  const { t } = useI18n();
  const navigation = useKioskNavigation();

  return (
    <KioskLayout title={t.errors.notFoundTitle}>
      <StateMessage
        icon="alert"
        title={t.errors.notFoundTitle}
        message={t.errors.notFoundMessage}
        actions={[{ label: t.errors.backHome, onClick: navigation.home, icon: 'home' }]}
      />
    </KioskLayout>
  );
}
