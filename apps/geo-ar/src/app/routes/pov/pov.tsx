/* eslint-disable react/jsx-no-useless-fragment */
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../../../main';
import { PovCardDetailsWrapper } from '../../povs/details';
import { usePovFromId } from '../../store/povs.slice';

export function PovRoute() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const povId = useMemo(() => pathname.split('/').pop(), [pathname]);
  const selectPovFromId = useMemo(usePovFromId, []);
  const pov = useSelector((state: RootState) =>
    selectPovFromId(state, povId || {})
  );

  const onClose = () => {
    navigate('/');
  };

  if (!pov) return <></>;

  return (
    <div className="fixed inset-0">
      <PovCardDetailsWrapper {...{ pov, onClose }} />
    </div>
  );
}

export default PovRoute;
