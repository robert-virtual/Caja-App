import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Monedas } from './Monedas';
import { DetalleAperturaCaja } from './DetalleAperturaCaja';
import { DetalleCierreCaja } from './DetalleCierreCaja';
import { DetalleCierreCajaPos } from './DetalleCierreCajaPos';
import { Inicio } from './Inicio';
import { Moneda } from './Moneda';
const Stack = createNativeStackNavigator()

export function Menu() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Inicio" component={Inicio} />
      <Stack.Screen name="Monedas" component={Monedas} />
      <Stack.Screen
        name="DetalleAperturaCaja"
        component={DetalleAperturaCaja} />
      <Stack.Screen
        name="DetalleCierreCaja"
        component={DetalleCierreCaja} />
      <Stack.Screen
        name="DetalleCierreCajaPos"
        component={DetalleCierreCajaPos} />
      <Stack.Screen name="AgregarMoneda" component={Moneda} />
      <Stack.Screen name="Moneda" component={Moneda} />
    </Stack.Navigator>
  );
}

