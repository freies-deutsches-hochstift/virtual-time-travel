import { useCamera } from './lib/camera';

/* eslint-disable-next-line */
export interface CameraExampleProps {}

export function CameraExample(props: CameraExampleProps) {
  const camera = useCamera();
  return (
    <>
      <h1>Camera Demo</h1>
      <fieldset>
        <legend>Camera</legend>
        {camera.state === 'unavailable' ? (
          <div>😭 Not available</div>
        ) : (
          <div>🥰 Should be available</div>
        )}

        <div>State : {camera.state}</div>
        {camera.state === 'unknown' && (
          <button
            onClick={() =>
              camera.request(
                document.getElementById('videoContainer') as HTMLVideoElement
              )
            }
          >
            Request Permission
          </button>
        )}

        {/* {camera.state === 'granted' && (
          console.log('granted');
          
        )} */}
        <video id="videoContainer" autoPlay={true} playsInline></video>
      </fieldset>
      <br />
      <div>
        Note : Most devices want you to request hardware access via a user
        event, like onClick. If permission has been granted before you can skip
        this, but there is also no way to check easily. You could save the state
        to localStore, but it could have changed.
      </div>
    </>
  );
}
