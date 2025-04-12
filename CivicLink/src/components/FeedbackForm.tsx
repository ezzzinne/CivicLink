// src/components/FeedbackForm.tsx
import { useState } from 'react';
import { Web3Storage } from 'web3.storage';
import { ethers } from 'ethers';
import contractABI from '../abi/FeedbackNFT.json';

declare global {
    interface ImportMetaEnv {
      readonly VITE_WEB3_STORAGE_TOKEN: string;
      readonly VITE_CONTRACT_ADDRESS: string;
    }

    interface ImportMeta {
        readonly env: ImportMetaEnv;
      }
}

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const client = new Web3Storage({
    token: import.meta.env.VITE_WEB3_STORAGE_TOKEN,
  });

  const uploadToIPFS = async (text: string) => {
    const blob = new Blob([text], { type: 'text/plain' });
    const files = [new File([blob], 'feedback.txt')];
    const cid = await client.put(files);
    return `ipfs://${cid}/feedback.txt`;
  };

  const uploadMetadataToIPFS = async (feedbackURI: string) => {
    const metadata = {
      name: 'Feedback NFT',
      description: 'Feedback from CivicLink user',
      feedback: feedbackURI,
    };
    const blob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
    const files = [new File([blob], 'metadata.json')];
    const cid = await client.put(files);
    return `ipfs://${cid}/metadata.json`;
  };

  const submit = async () => {
    setLoading(true);
    setStatus('Uploading feedback...');

    try {
      const feedbackURI = await uploadToIPFS(feedback);
      const metadataURI = await uploadMetadataToIPFS(feedbackURI);

      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        import.meta.env.VITE_CONTRACT_ADDRESS,
        contractABI,
        signer
      );

      setStatus('Minting NFT...');
      const tx = await contract.submitFeedback(feedbackURI, metadataURI);
      await tx.wait();

      setStatus('✅ Feedback submitted and NFT minted!');
      setFeedback('');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setStatus('❌ Error: ' + err.message);
    }

    setLoading(false);
  };

  return (
    <div>
      <h3>Submit Feedback</h3>
      <textarea
        rows={4}
        placeholder="Your feedback here..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <button onClick={submit} disabled={loading || !feedback}>
        {loading ? 'Submitting...' : 'Submit Feedback'}
      </button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default FeedbackForm;
