import LoadingRing from "./presentation/LoadingRing";
import "styles/base.scss";
import { useTranslation } from "react-i18next";
import "util/i18n";

function App() {
  const { t } = useTranslation("common");
  return (
    <div>
      <LoadingRing />
      {t("pepito")}
    </div>
  );
}

export default App;
