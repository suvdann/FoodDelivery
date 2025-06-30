import { DishCategoryTabs } from "./_components/DishCategoryTabs";
import { DishList } from "./_components/DishList";
import axios from "axios";

export default async function AdminMenuPage() {
  const { data } = await axios.get(
    "https://fooddelivery-backend-zyay.onrender.com"
  );
  // const [selectedCategory, setSelectedCategory] = useState("all");
  return (
    <div>
      <h1>Dishes category</h1>
      <DishCategoryTabs foods={data.foods} />
      <DishList foods={data.foods} />
    </div>
  );
}
