import { useState } from "react";
import { sellerProfile } from "../utils/schema";

function SellerProfile() {
  const [profile, setProfile] = useState<sellerProfile>({
    seller_id: "adjsanfds",
    username: "Mukesh Bhindrewal",
    email: "mukesh@example.com",
    contact: "+91 94919 23499 , +91 86794 98543",
    about: "I am a successful software engineer and a loyal customer.",
    rating: 3.5,
    url: "http://www.example.com",
    address: "123 Main St, New York, NY, 10001",
  });
  return (
    <div className="px-16 flex-col items-start space-y-5 py-10 max-sm:px-1.5 max-sm:py-5">
      <h2 className="text-2xl px-3 font-bold">Seller Information</h2>
      <table className="max-sm:w-full table-fixed">
        <tbody className="*:border-b-[1px] *:border-gray-500">
          {Object.keys(profile).map((pf, i) => (
            <tr key={i} className="*:px-5 *:py-3 max-sm:*px-2">
              <th className="bg-gray-400/10 w-[15rem] max-sm:w-auto">
                {pf.toUpperCase()}
              </th>
              <td className="bg-gray-600/5">
                {profile[pf as keyof sellerProfile]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SellerProfile;
