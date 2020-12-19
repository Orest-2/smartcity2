import { CalculatorState } from '~/store/calculator'
import { HomeState } from '~/store/home'
import { SettingsState } from '~/store/settings'

export type RootState = {
  home: HomeState;
  settings: SettingsState;
  calculator: CalculatorState;
}
